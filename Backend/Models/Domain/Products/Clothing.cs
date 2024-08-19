
namespace ZdyesAPI.Models.Domain.Products
{
    public class Clothing
    {
        public Guid ProductId { get; set; }
        public ClothingTypeEnum ClothingType { get; set; }
        public int Cotton { get; set; }
        public int Polyester { get; set; }
        public int Wool { get; set; }
        public int Linen { get; set; }

        public List<ClothingInventory>? Inventories { get; set; }

        public Product? Product { get; set; }

    }

    public enum ClothingTypeEnum
    {
        All = 0,
        Shirt = 1, 
        Pants = 2,
        Shorts = 3,
        Hat = 4,
        Other = 5,
    }

    public enum SizeEnum
    {
     Any = 0,
     SM  = 1,
     MD = 2,
     LG = 3,
     XL = 4,
     XXL = 5,
    }

}
