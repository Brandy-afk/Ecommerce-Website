using ZdyesAPI.Models.DTO.Product;

namespace ZdyesAPI.Models.DTO.Stripe
{
    public class CreateStripeSessionRequest
    {
        public List<CartProductDTO> Cart { get; set; }

        public string? Note { get; set; }
        
    }
}
