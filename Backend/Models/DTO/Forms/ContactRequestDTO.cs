namespace ZdyesAPI.Models.DTO.Forms
{
    public class ContactRequestDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public ContactType ContactType { get; set; }
        public string Message { get; set; }
        public string? OrderId { get; set; }


    }

    public enum ContactType
    {
        None = 0,
        GeneralInquiry = 1,
        OrderInquiry = 2,
        BusinessInquiry = 3,
        CustomDisc = 4,
        Other = 5,

    }
}
