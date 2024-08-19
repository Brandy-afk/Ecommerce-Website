using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Image;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class ImageRepository : IImageRepository
    {
        private readonly IWebHostEnvironment host;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ZDyesDbContext db;
        private readonly ILogger<ImageRepository> logger;

        public ImageRepository(IWebHostEnvironment host,
            IHttpContextAccessor httpContext,
            ZDyesDbContext db, 
            ILogger<ImageRepository> logger)
        {
            this.host = host;
            httpContextAccessor = httpContext;
            this.db = db;
            this.logger = logger;
        }


        public async Task<List<Image>> GetAllAsync() => await db.Images.ToListAsync();

        public async Task<Image?> GetAsync(Guid id) => await db.Images.FindAsync(id);

        public async Task<bool?> RemoveAndDeleteAsync(Guid id)
        {
            var toRemove = await GetAsync(id);
            if (toRemove == null)
            {
                return false;
            }

            try
            {
                await DeleteAsync(toRemove);
                await RemoveAsync(toRemove);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<Image?> RemoveAsync(Guid id)
        {
            var toRemove = await GetAsync(id);
            return await RemoveAsync(toRemove);
        }

        public async Task<Image?> RemoveAsync(Image toRemove)
        {
            if (toRemove != null)
            {
                db.Images.Remove(toRemove);
                await db.SaveChangesAsync();
            }
            return toRemove;
        }




        /// <summary>
        /// This function deletes the image from its local path. This function does NOT delete the image from the db. (Cascade should do this).
        /// </summary>
        /// <param name="id"></param>
        /// <returns>True if the image was deleted, otherwise an error occured.</returns>
        public async Task<bool?> DeleteAsync(Guid id)
        {
           var image = await GetAsync(id);
            if (image == null) 
            { 
                return false; 
            }
            
            return await DeleteAsync(image);
        }

        /// <summary>
        /// This function deletes the image from its local path. This function does NOT delete the image from the db. (Cascade should do this).
        /// </summary>
        /// <param name="id"></param>
        /// <returns>True if the image was deleted, otherwise an error occured.</returns>
        public async Task<bool?> DeleteAsync(Image image)
        {
            if (!string.IsNullOrEmpty(image.FilePath))
            {
                var fileToDelete = new Uri(image.FilePath).LocalPath;
                if (File.Exists(fileToDelete))
                {
                    try
                    {
                        File.Delete(fileToDelete);
                    }
                    catch (IOException ex)
                    {
                        logger.LogError(ex, "Error deleting image file: {FilePath}", fileToDelete);
                        return false;
                    }
                }
            }

            return true;
        }

        public async Task<Image> UploadAsync(Image image)
        {
            var localFilePath = Path.Combine(host.ContentRootPath, "Images", $"{image.FileName}{image.FileExtension}");
            using var stream = new FileStream(localFilePath, FileMode.Create);
            await image.File.CopyToAsync(stream);

            // https://localhost:1234/images/image.jpg
            var urlFilePath =
                $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                $"{httpContextAccessor.HttpContext.Request.Host}" +
                $"{httpContextAccessor.HttpContext.Request.PathBase}/Images/" +
                $"{image.FileName}" +
                $"{image.FileExtension}";
            image.FilePath = urlFilePath;

            await db.Images.AddAsync(image);
            await db.SaveChangesAsync();
            return image;
        }

        public async Task<Image?> UpdateAsync(Guid id, ImageUpdateRequestDTO request)
        {
               var image = await GetAsync(id);
                if (image != null)
                {
                    image.FileName = request.FileName;
                    image.FileDescription = request.FileDescription;
                    await db.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("Unable to find image.");
                }

            return image;
            }
        }
    }

