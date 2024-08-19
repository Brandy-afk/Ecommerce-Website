using Microsoft.EntityFrameworkCore;
using Stripe.Checkout;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain.Payments;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ZDyesDbContext db;

        public PaymentRepository(ZDyesDbContext dbContext)
        {
           db = dbContext;
        }

        public async Task<PaymentRecord> CreateAsync(Session session)
        {
            var record = new PaymentRecord()
            {
                StripeSessionId = session.Id,
                Created = DateTime.UtcNow,
                Status = "Created"
            };

            await db.AddAsync(record);
            await db.SaveChangesAsync();
            return record;
        }

        public async Task<PaymentRecord?> GetAsync(string sessionId) => await db.PaymentRecords.FirstOrDefaultAsync(pr => pr.StripeSessionId == sessionId);

        public async Task<PaymentRecord?> UpdateAsync(string sessionId, string status)
        {
            PaymentRecord record = await GetAsync(sessionId);
            if(record != null)
            {
                record.Status = status;
                await db.SaveChangesAsync();
            }
            return record;
        }
    }
}
