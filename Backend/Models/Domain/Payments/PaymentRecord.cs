namespace ZdyesAPI.Models.Domain.Payments
{
    public class PaymentRecord
    {
        public Guid Id { get; set; }
        public string StripeSessionId { get; set; }
        public DateTime Created { get; set; }
        public string Status { get; set; }
    }
   
}
