using ZdyesAPI.Models.Domain.Products;


namespace ZdyesAPI.Models.DTO.Product
{
    public class AddProductDTO
    {
        public string TrackingId { get; set; }
        public Guid ImageId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<string> Colors { get; set; }
        public bool Active { get; set; }
        public int Stock {  get; set; }
        public ManufacturerEnum Manufacturer { get; set; }
        public ProductTypeEnum ProductType { get; set; }
        public DiscDTO? Disc { get; set; }
        public ClothingDTO? Clothing { get; set; }
    }
}
