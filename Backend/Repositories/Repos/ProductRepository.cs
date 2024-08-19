using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Product;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class ProductRepository : IProductRepository
    {
        private readonly ZDyesDbContext db;
        private readonly IMapper mapper;

        public ProductRepository(ZDyesDbContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }


        public async Task<(List<Product>, int)> GetAllAsync(
                   bool? activeOnly = true,
            List<ProductTypeEnum>? productTypes = null,
            int? pageNumber = 1,
            int? limit = 1000,
            List<string>? colorQuery = null,
            List<ManufacturerEnum>? manufacturers = null,
            List<DiscTypeEnum>? discTypes = null,
            string? nameQuery = null,
            float? minPrice = null,
            float? maxPrice = null,
            bool? inStockOnly = false,
            List<string>? idQuery = null,
            string? sortQuery = null,
            bool? isDescending = false)
        {
            // Assuming you're using Entity Framework Core
            var query = db.Products.AsQueryable();

            // Apply filters
            if (activeOnly.HasValue)
            {
                query = query.Where(p => p.Active == activeOnly.Value);
            }

            if (productTypes != null && productTypes.Count > 0)
            {
                query = query.Where(p => productTypes.Contains(p.ProductType));

                if (productTypes.Contains(ProductTypeEnum.Disc))
                {
                    query = query.Include(p => p.Disc).ThenInclude(d => d.Inventory);
                    if (discTypes != null && discTypes.Count > 0)
                    {
                        query = query.Where(p => p.Disc != null && discTypes.Contains(p.Disc.DiscType));
                    }
                }

                if (productTypes.Contains(ProductTypeEnum.Clothing))
                {
                    query = query.Include(p => p.Clothing).ThenInclude(c => c.Inventories);
                }
            }
            else
            {
                query = query.Include(p => p.Disc).ThenInclude(d => d.Inventory)
                             .Include(p => p.Clothing).ThenInclude(c => c.Inventories);
            }

            if (manufacturers != null && manufacturers.Count > 0)
            {
                query = query.Where(p => manufacturers.Contains(p.Manufacturer));
            }

            if (colorQuery != null && colorQuery.Count > 0)
            {
                // Assuming Colors is a List<string>. You might need to adjust this based on how colors are stored
                query = query.Where(p => p.Colors.Any(c => colorQuery.Contains(c)));
            }

            if (!string.IsNullOrEmpty(nameQuery))
            {
                query = query.Where(p => p.Name.Contains(nameQuery) || p.Description.Contains(nameQuery));
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            if (inStockOnly.HasValue && inStockOnly.Value)
            {
                query = query.Where(p =>
               (p.ProductType == ProductTypeEnum.Disc && p.Disc != null && p.Disc.Inventory.Quantity > 0) ||
               (p.ProductType == ProductTypeEnum.Clothing && p.Clothing != null && p.Clothing.Inventories.Sum(i => i.Quantity) > 0));
            }


            if (idQuery != null && idQuery.Count > 0)
            {
                var guidIds = idQuery.Select(id => Guid.Parse(id)).ToList();
                query = query.Where(p => guidIds.Contains(p.ProductId));
            }



            query = query.Include(p => p.Image);
            query = ApplySorting(query, sortQuery, isDescending);

            int totalCount = await query.CountAsync();
            if (pageNumber.HasValue && limit.HasValue)
            {
                query = query.Skip((pageNumber.Value - 1) * limit.Value).Take(limit.Value);
            }

            var list = await query.ToListAsync();
            return (list, totalCount);
        }

        private IQueryable<Product> ApplySorting(IQueryable<Product> query, string? sortQuery, bool? isDescending)
        {
            if (sortQuery != null && isDescending != null)
            {
                switch (sortQuery)
                {
                    case "price":
                        return (bool)isDescending ? query.OrderByDescending(p => p.Price) : query.OrderBy(p => p.Price);
                    case "stock":
                        return (bool)isDescending
                            ? query.OrderByDescending(p =>
                                p.Disc != null
                                    ? p.Disc.Inventory.Quantity
                                    : p.Clothing.Inventories.Sum(i => i.Quantity))
                            : query.OrderBy(p =>
                                p.Disc != null
                                    ? p.Disc.Inventory.Quantity
                                    : p.Clothing.Inventories.Sum(i => i.Quantity));
                    default:
                        return query;
                }
            }
            return query;
        }

 
        public async Task<Product?> GetAsync(Guid id)
        {
            return await db.Products
                .Include(p => p.Image)
                .Include(p => p.Disc).ThenInclude(d => d.Inventory)
                .Include(p => p.Clothing).ThenInclude(c => c.Inventories)
                .FirstOrDefaultAsync(p => p.ProductId == id);
        }

        public async Task<Product> CreateAsync(AddProductDTO request)
        {
            var newProduct = mapper.Map<Product>(request);
            await db.Products.AddAsync(newProduct);
            await db.SaveChangesAsync();
            return newProduct;

        }
        public async Task<Product> CreateWithoutSavingAsync(AddProductDTO request)
        {
            var newProduct = mapper.Map<Product>(request);
            await db.Products.AddAsync(newProduct);
            return newProduct;
        }

        public async Task<Product?> DeleteAsync(Guid id)
        {
            var toRemove = await GetAsync(id);
            if (toRemove != null)
            {
                db.Products.Remove(toRemove);
                await db.SaveChangesAsync();
            }
            return toRemove;
        }


        public async Task<Product?> UpdateAsync(Guid id, UpdateProductDTO request)
        {
            var product = await GetAsync(id);
            if (product != null)
            {
                product.Active = request.Active;
                product.Description = request.Description;
                product.Name = request.Name;
                product.Price = request.Price;
                product.Manufacturer = request.Manufacturer;
                product.TrackingId = request.TrackingId;
                product.Colors = request.Colors;
                await db.SaveChangesAsync();
            }
            return product;
        }

        public async Task<Product?> UpdateImageId(Guid oldImageId, Guid newImageId)
        {
           var product = await db.Products.FirstOrDefaultAsync(p => p.ImageId == oldImageId);
            if(product != null)
            {
                product.ImageId = newImageId;
                await db.SaveChangesAsync();
            }
            return product;
        }
    }
}
