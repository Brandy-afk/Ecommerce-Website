using ZdyesAPI.Models.Domain.Products;

namespace ZdyesAPI.Models.DTO.Inventory
{
    public class ClothingInventoryCreateDTO
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public SizeEnum Size { get; set; }

    }
}
