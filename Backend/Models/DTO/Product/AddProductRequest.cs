using Microsoft.AspNetCore.Mvc;

namespace ZdyesAPI.Models.DTO.Product
{
    public class AddProductRequest
    {
        public IFormFile ImageFile { get; set; }
        public string ProductData { get; set; }
    }
}
