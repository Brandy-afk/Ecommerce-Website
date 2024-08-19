using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.DTO.Image;

namespace ZdyesAPI.Models.DTO.Product
{
    public class ProductDTO
    {
        public Guid ProductId { get; set; }
        public string TrackingId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<string> Colors { get; set; }
        public ManufacturerEnum Manufacturer { get; set; }
        public ProductTypeEnum ProductType { get; set; }
        public int Stock { get; set; }
        public bool Active { get; set; }
        public ImageDTO? Image { get; set; }
        public DiscDTO? Disc { get; set; }
        public ClothingDTO? Clothing { get; set; }
    }
}
