using ZdyesAPI.Helpers;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Image;

public interface IImageService
{
    Task<ServiceResult<Image>> UploadAsync(ImageUploadRequestDTO request);
}
