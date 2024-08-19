using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.DTO.Product;
using ZdyesAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using ZdyesAPI.Migrations;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository productRepository;
        private readonly ZDyesDbContext db;
        private readonly IInventoryRepository inventoryRepository;
        private readonly IMapper mapper;
        private readonly IClothingRepository clothingRepository;
        private readonly IDiscRepository discRepository;
        private readonly IClothingInventoryRepository clothingInventoryRepository;
        private readonly ILogger<ProductController> logger;
        private readonly IImageRepository imageRepository;

        public ProductController
            (IProductRepository productRepository,
            ZDyesDbContext db,
            IInventoryRepository inventoryRepository,
            IMapper mapper,
            IClothingRepository clothingRepository,
            IDiscRepository discRepository,
            IClothingInventoryRepository clothingInventoryRepository,
            ILogger<ProductController> _logger,
            IImageRepository imageRepository)
        {
            this.productRepository = productRepository;
            this.db = db;
            this.inventoryRepository = inventoryRepository;
            this.mapper = mapper;
            this.clothingRepository = clothingRepository;
            this.discRepository = discRepository;
            this.clothingInventoryRepository = clothingInventoryRepository;
            logger = _logger;
            this.imageRepository = imageRepository;
        }


        [HttpGet]
        public async Task<IActionResult> Get(
           [FromQuery] bool? activeOnly,
        [FromQuery] List<ProductTypeEnum>? productTypes,
        [FromQuery] int? pageNumber,
        [FromQuery] int? limit,
        [FromQuery] List<string>? colorQuery,
        [FromQuery] List<ManufacturerEnum>? manufacturers,
        [FromQuery] List<DiscTypeEnum>? discTypes,
        [FromQuery] string? nameQuery,
        [FromQuery] float? minPrice,
        [FromQuery] float? maxPrice,
        [FromQuery] bool? inStockOnly,
        [FromQuery] List<string>? idQuery,
        [FromQuery] string? sortQuery,
        [FromQuery] bool? isDescending)
        {

          

            (List<Product> products, int count) = await productRepository.GetAllAsync(
                activeOnly,
                productTypes,
                pageNumber,
                limit,
                colorQuery,
                manufacturers,
                discTypes,
                nameQuery,
                minPrice,
                maxPrice,
                inStockOnly,
                idQuery,
                sortQuery,
                isDescending
            );

            List<ProductDTO> productDTOs = new();
            foreach (var product in products)
            {
                productDTOs.Add(mapper.Map<ProductDTO>(product));

            }


            return Ok(new ProductQueryDTO { Count=count, Products = productDTOs});
        }

        [HttpGet]
        [Route("recent")]
        public async Task<IActionResult> GetRecentProducts()
        {
            (List<Product> products, int count )= await productRepository.GetAllAsync(true, [ProductTypeEnum.Disc]);
            var recentProducts = products.OrderByDescending(p => p.UploadDate)
                                         .Take(7)
                                         .ToList();
            List<ProductDTO> productDTOs = new();
            foreach (var product in recentProducts)
                productDTOs.Add(mapper.Map<ProductDTO>(product));

            return Ok(productDTOs);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var product = await productRepository.GetAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productDTO = mapper.Map<ProductDTO>(product);

            return Ok(productDTO);

        }

        [HttpPost]
        [Authorize(Policy = ("AdminOnly"))]
        public async Task<IActionResult> CreateProduct ([FromBody] AddProductDTO input)
        {
            if (input.ProductType != ProductTypeEnum.Disc && input.ProductType != ProductTypeEnum.Clothing) return BadRequest("Incorrect Product Type!");

            using var transaction = await db.Database.BeginTransactionAsync();

            try
            {
                var product = await productRepository.CreateWithoutSavingAsync(input);

                switch (input.ProductType)
                {
                    case ProductTypeEnum.Disc:
                        if (input.Disc != null)
                            product.Disc.Inventory = await inventoryRepository.
                                 CreateWithoutSavingAndAddingAsync(input.Stock, product.ProductId);
                        break;

                    case ProductTypeEnum.Clothing:
                        if (input.Clothing != null && input.Clothing.Inventories != null)
                            product.Clothing.Inventories = await clothingInventoryRepository.
                               CreateMultipleWithoutSavingOrAddingAsync(input.Clothing.Inventories, product.ProductId);
                        break;

                    default:
                        throw new Exception("No unique product information filled out!");
                }

                await db.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok(mapper.Map<ProductDTO>(product));
            }
            catch (Exception ex) {
                await transaction.RollbackAsync();
                await imageRepository.RemoveAndDeleteAsync(input.ImageId);
                // Log the exception
                return StatusCode(500, "An error occurred while creating the product: " + ex.Message);
            }
          
        }

        [HttpDelete]
        [Route("{id:guid}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            Product deletedProduct = await productRepository.DeleteAsync(id);
            if (deletedProduct == null)
                return NotFound();

            return Ok(mapper.Map<ProductDTO>(deletedProduct));
        }


        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateProductDTO request)
        {

            Product updatedProduct = await productRepository.UpdateAsync(id, request);
            if (updatedProduct == null)
                return NotFound();

            return Ok(mapper.Map<ProductDTO>(updatedProduct));


        }

    }
}
