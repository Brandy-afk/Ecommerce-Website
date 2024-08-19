using System.ComponentModel.DataAnnotations.Schema;

namespace ZdyesAPI.Models.Domain.Products
{
    public class Image
    {
        public Guid ImageId { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }
        public string FileName { get; set; }
        public string? FileDescription { get; set; }
        public string FileExtension { get; set; }
        public long FileSizeInBytes { get; set; }
        public string FilePath { get; set; }
    }
}
