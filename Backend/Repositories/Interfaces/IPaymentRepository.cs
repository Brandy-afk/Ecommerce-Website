using Stripe.Checkout;
using ZdyesAPI.Models.Domain.Payments;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface IPaymentRepository
    {
        public Task<PaymentRecord> CreateAsync(Session session);
        public Task<PaymentRecord?> GetAsync(string sessionId);
        public Task<PaymentRecord?> UpdateAsync(string sessionId, string status);

    }
}
