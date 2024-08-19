using ZdyesAPI.Models.Domain.Products;

namespace ZdyesAPI.Models.Domain
{
    public class ClothingInventory
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public SizeEnum Size { get; set; }
        public int Quantity { get; set; }
        public Clothing Clothing { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
