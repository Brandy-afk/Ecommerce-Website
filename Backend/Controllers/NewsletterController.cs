using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZdyesAPI.Data;
using ZdyesAPI.Models.DTO;
using ZdyesAPI.Models.DTO.Forms;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsletterController : ControllerBase
    {
        private readonly INewsletterRepository newsletterRepo;

        public NewsletterController(INewsletterRepository newsletterRepo)
        {
            this.newsletterRepo = newsletterRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddToNewsletter([FromBody] SubToNewsletterDTO request)
        {
            try
            {
                await newsletterRepo.AddAsync(request.Email);
                return Ok(new { message = "Added Email!" } );
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Processing failed" });
            }
        }
    }
}
