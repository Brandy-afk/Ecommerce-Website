using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe.Checkout;
using ZdyesAPI.Models.DTO.Stripe;
using ZdyesAPI.Repositories.Interfaces;
using ZdyesAPI.Services;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly StripePaymentService stripePaymentService;
        private readonly IPaymentRepository paymentRepository;

        public PaymentController(StripePaymentService stripePaymentService, IPaymentRepository paymentRepository)
        {
            this.stripePaymentService = stripePaymentService;
            this.paymentRepository = paymentRepository;
        }


        [HttpPost]
        [Route("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateStripeSessionRequest request)
        {
            Session session = await stripePaymentService.CreateCheckoutSession(request); 
            await paymentRepository.CreateAsync(session);

            return Ok(new { sessionId = session.Id });
        }

        [HttpGet("success")]
        public async Task<IActionResult> Success(string sessionId)
        {
            return await Update(sessionId, "Success", "Payment successful.");
        }

        [HttpGet("cancel")]
        public async Task<IActionResult> Cancel(string sessionId)
        {
            return await Update(sessionId, "Cancelled", "Paymnent Cancelled");
        }

        private async Task<IActionResult> Update(string sessionId, string state, string message)
        {
            try
            {
                await paymentRepository.UpdateAsync(sessionId, state);
                // Redirect
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

 
}
