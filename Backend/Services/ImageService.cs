using AutoMapper;
using ZdyesAPI.Helpers;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Image;
using ZdyesAPI.Repositories.Interfaces;

public class ImageService : IImageService
{
    private readonly IImageRepository repo;
    private readonly IMapper mapper;

    public ImageService(IImageRepository repo, IMapper mapper)
    {
        this.repo = repo;
        this.mapper = mapper;
    }

    public async Task<ServiceResult<Image>> UploadAsync(ImageUploadRequestDTO request)
    {
        var validationResult = ValidateFileUpload(request);
        if (!validationResult.IsSuccess)
        {
            return new ServiceResult<Image>(validationResult.Errors);
        }

        var newImage = new Image
        {
            File = request.File,
            FileName = request.FileName,
            FileExtension = System.IO.Path.GetExtension(request.File.FileName),
            FileSizeInBytes = request.File.Length,
            FileDescription = request.FileDescription

        };

        await repo.UploadAsync(newImage);
        return new ServiceResult<Image>(newImage);
    }



    private ServiceResult<bool> ValidateFileUpload(ImageUploadRequestDTO request)
    {
        var errors = new Dictionary<string, string[]>();

        if (request.File == null || request.File.Length == 0)
        {
            errors.Add("File", new[] { "Please select a file." });
        }
        else if (request.File.Length > 10 * 1024 * 1024) // 10MB limit
        {
            errors.Add("File", new[] { "File size cannot exceed 10MB." });
        }

        // Add more validation as needed

        if (errors.Any())
        {
            return new ServiceResult<bool>(errors);
        }

        return new ServiceResult<bool>(true);
    }
}