using ZdyesAPI.Models.Domain.Products;

namespace ZdyesAPI.Models.DTO.Product
{
    public class DiscDTO
    {
        public DiscTypeEnum DiscType { get; set; }
        public bool Custom { get; set; }
        public float Diameter { get; set; }
        public float Thickness { get; set; }
        public float Weight { get; set; }
    }
}
