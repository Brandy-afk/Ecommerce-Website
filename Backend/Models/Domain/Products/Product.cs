namespace ZdyesAPI.Models.Domain.Products
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public Guid ImageId { get; set; }
        public string TrackingId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<string> Colors { get; set; }
        public ManufacturerEnum Manufacturer { get; set; }
        public ProductTypeEnum ProductType { get; set; }
        public bool Active { get; set; }
        public Image? Image { get; set; }
        public Disc? Disc { get; set; }
        public Clothing? Clothing { get; set; }
        public DateTime UploadDate { get; set; }
        public DateTime LastUpdate { get; set; }
    }

    public enum ProductTypeEnum
    {
        Any = 0,
        Disc = 1,
        Clothing = 2,
        Other = 3,
    }

    public enum ManufacturerEnum
    {
        Any = 0,
        Zdyes = 1,
        Discmania = 2,
        Discraft = 3,
        Innova = 4,
        LoneStarDisc = 5,
        MVP = 6,
    }
}
