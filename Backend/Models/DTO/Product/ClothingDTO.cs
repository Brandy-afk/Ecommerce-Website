using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Inventory;

namespace ZdyesAPI.Models.DTO.Product
{
    public class ClothingDTO
    {
        public int Cotton { get; set; }
        public int Polyester { get; set; }
        public int Wool { get; set; }
        public int Linen { get; set; }
        public ClothingTypeEnum ClothingType { get; set; }
        public List<ClothingInventoryDTO>? Inventories { get; set; }
    }
}
