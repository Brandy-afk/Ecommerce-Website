using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe.Forwarding;
using System;
using ZdyesAPI.Models.DTO.Forms;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly Random _random;
        private readonly ILogger<ContactController> _logger;

        public ContactController(ILogger<ContactController> logger)
        {
            _random = new Random();
            this._logger = logger;
        }


        [HttpPost]
        public IActionResult Submit([FromBody] ContactRequestDTO request)
        {
            // Log the request
            _logger.LogInformation(
                "Contact Request Received: " +
                "Name: {Name}, " +
                "Email: {Email}, " +
                "ContactType: {ContactType}, " +
                "Message: {Message}, " +
                "OrderId: {OrderId}",
                request.Name,
                request.Email,
                request.ContactType,
                request.Message,
                request.OrderId ?? "N/A"
            );

            // Simulate a 50-50 chance of success or failure
            if (_random.Next(2) == 0)
            {
                _logger.LogInformation("Contact request processing failed");
                return BadRequest(new { error = "Processing failed" });
            }
            else
            {
                _logger.LogInformation("Contact request processed successfully");
                return Ok(new { message = "Sent info!" });
            }
        }

    }
}
