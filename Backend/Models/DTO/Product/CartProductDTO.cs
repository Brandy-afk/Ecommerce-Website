using ZdyesAPI.Models.Domain.Products;

namespace ZdyesAPI.Models.DTO.Product
{
    public class CartProductDTO
    {
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public SizeEnum? Size { get; set; }

    }
}
