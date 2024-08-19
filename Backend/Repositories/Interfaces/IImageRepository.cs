using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Image;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface IImageRepository
    {
        public Task<Image> UploadAsync(Image image);

        public Task<Image?> GetAsync(Guid id);

        public Task<Image?> UpdateAsync(Guid id, ImageUpdateRequestDTO request);

        public Task<bool?> RemoveAndDeleteAsync(Guid id);

        public Task<List<Image>> GetAllAsync();
        
    }
}
