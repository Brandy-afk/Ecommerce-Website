using ZdyesAPI.Models.Domain.Products;

namespace ZdyesAPI.Models.DTO.Product
{
    public class UpdateProductDTO
    {
        public string Name { get; set; }
        public string TrackingId { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<string> Colors { get; set; }
        public bool Active { get; set; }
        public ManufacturerEnum Manufacturer { get; set; }

    }
}
