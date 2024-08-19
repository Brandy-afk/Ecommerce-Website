namespace ZdyesAPI.Models.Domain.Orders
{
    public enum OrderStatus
    {
        Pending, // Means its waiting for payment or some other intial loading
        Processing, // Means payment has come through and the order is being processed
        OnHold, // Some issue occured and the order is on hold
        Shipped, // Order has been shipped
        Completed, // Order has been delivered
        Refunded, // Order had issues and payment was refunded.
        Failed, // Larger issue occured causing the order to be simply cancelled.
        Dispute, // Current order dispute. 
    }
}
