namespace ZdyesAPI.Models.DTO.Image
{
    public class ImageDTO
    {
        public Guid ImageId { get; set; }
        public string FileName { get; set; }
        public string? FileDescription { get; set; }
        public string FilePath { get; set; }
    }
}
