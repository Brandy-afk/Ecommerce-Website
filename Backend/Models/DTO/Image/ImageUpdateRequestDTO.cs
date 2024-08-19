using System.ComponentModel.DataAnnotations;

namespace ZdyesAPI.Models.DTO.Image
{
    public class ImageUpdateRequestDTO
    {
        public IFormFile? File { get; set; }
        public string FileName { get; set; }
        public string FileDescription { get; set; }
    }
}
