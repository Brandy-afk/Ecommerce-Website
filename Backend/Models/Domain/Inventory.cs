using ZdyesAPI.Models.Domain.Products;

namespace ZdyesAPI.Models.Domain
{
    public class Inventory
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
