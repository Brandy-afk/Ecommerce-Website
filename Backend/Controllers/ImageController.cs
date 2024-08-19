using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Image;
using ZdyesAPI.Models.DTO.Product;
using ZdyesAPI.Repositories.Interfaces;
using ZdyesAPI.Repositories.Repos;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
   
        private readonly IMapper mapper;
        private readonly IImageService imageService;
        private readonly IImageRepository imageRepository;
        private readonly ZDyesDbContext db;
        private readonly IProductRepository productRepository;
        private readonly ILogger<ImageController> logger;

        public ImageController(IMapper mapper, IImageService imageService, 
            IImageRepository imageRepository, ZDyesDbContext db,
            IProductRepository productRepository, ILogger<ImageController> logger)
        {
  
            this.mapper = mapper;
            this.imageService = imageService;
            this.imageRepository = imageRepository;
            this.db = db;
            this.productRepository = productRepository;
            this.logger = logger;
        }

        // POST: /api/Images/upload
        [HttpPost]
        [Route("upload")]
        [Authorize(Policy = ("AdminOnly"))]
        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDTO request)
        {
            try
            {
                var imageDto = await imageService.UploadAsync(request);
                return Ok(mapper.Map<ImageDTO>(imageDto.Data));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while uploading the image");
            }
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromForm] ImageUpdateRequestDTO request)
        {
            try
            {
            
                if(request.File != null)
                {
                    using var transaction = await db.Database.BeginTransactionAsync();
                    try
                    {
                        var newImage = await imageService.UploadAsync(new ImageUploadRequestDTO()
                        {
                            File = request.File,
                            FileDescription = request.FileDescription,
                            FileName = request.FileName
                        });

                        if (!newImage.IsSuccess) throw new Exception("Image upload failed");

                        await productRepository.UpdateImageId(id, newImage.Data.ImageId);
                        await imageRepository.RemoveAndDeleteAsync(id);
                        await transaction.CommitAsync();
                        return Ok(mapper.Map<ImageDTO>(newImage.Data));
                    }
                    catch (Exception ex)
                    {
                        await transaction.RollbackAsync();
                        throw new Exception("Failed to update image", ex);
                    }
                }
                else
                {
                    var image = await imageRepository.UpdateAsync(id, request);
                    return Ok(mapper.Map<ImageDTO>(image));
                }

            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while uploading the image");
            }
        }




    }
}
