using Stripe;
using Stripe.Checkout;
using Microsoft.Extensions.Options;
using ZdyesAPI.Models;
using ZdyesAPI.Models.DTO.Stripe;
using ZdyesAPI.Repositories.Interfaces;
using ZdyesAPI.Models.DTO.Product;


namespace ZdyesAPI.Services
{

    public class StripePaymentService
    {
        private readonly IProductRepository productRepository;

        public StripePaymentService(IOptions<StripeSettings> stripeSettings, IProductRepository productRepository)
        {
            StripeConfiguration.ApiKey = stripeSettings.Value.SecretKey;
            this.productRepository = productRepository;
        }

        public async Task<Session> CreateCheckoutSession(CreateStripeSessionRequest request)
        {
            var cartIds = request.Cart.Select(cartItem => cartItem.ProductId).ToHashSet();
            (List < Models.Domain.Products.Product > products, int count) = await productRepository.GetAllAsync(idQuery: cartIds.ToList() );

            var productMap = CreateProductMap(request.Cart, products);
            var lineItems = CreateLineItems(productMap);

            return await CreateSession(lineItems, request.Note);
        }

        private Dictionary<CartProductDTO, Models.Domain.Products.Product> CreateProductMap(List<CartProductDTO> cart, List<Models.Domain.Products.Product> products)
        {
            Dictionary<CartProductDTO, Models.Domain.Products.Product> productMap = [];
            foreach (var cartItem in cart)
            {
                var product = products.FirstOrDefault(p => p.ProductId.ToString() == cartItem.ProductId);
                if (product != null)
                {
                    productMap.Add(cartItem, product);
                }
            }
            return productMap;
        }

        private List<SessionLineItemOptions> CreateLineItems(Dictionary<CartProductDTO, Models.Domain.Products.Product> productMap)
        {
            var lineItems = new List<SessionLineItemOptions>();
            foreach (var item in productMap)
            {
                var product = item.Value;
                var cartItem = item.Key;

                lineItems.Add(new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long)(product.Price * 100), // Convert to cents
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            //Images = product?.Image?.FilePath != null ? [product.Image.FilePath] : null,
                            Name = $"{product?.Name}{(cartItem.Size != null ? $" | {cartItem.Size}" : "")}" ?? "Error",
                            Description = product?.Description ?? "Error",
                        },
                    },
                    Quantity = cartItem.Quantity,
                });
            }
            return lineItems;
        }

        private async Task<Session> CreateSession(List<SessionLineItemOptions> lineItems, string? note)
        {

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = "https://checkout.stripe.com/success",
                CancelUrl = "https://checkout.stripe.com/cancel",
                Metadata = new Dictionary<string, string>()
            };

            if (!string.IsNullOrEmpty(note))
            {
                options.Metadata.Add("OrderNote", note);
            }

            var service = new SessionService();
            return await service.CreateAsync(options);
        }
    }
}
