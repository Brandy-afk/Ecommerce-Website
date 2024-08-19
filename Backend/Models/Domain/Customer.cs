using ZdyesAPI.Models.Domain.Orders;

namespace ZdyesAPI.Models.Domain
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<Order> Orders { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime LastOrderDate { get; set; }
    }
}
