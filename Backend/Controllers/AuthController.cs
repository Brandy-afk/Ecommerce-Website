
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ZDyes.Models.DTO;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenRepository tokenRepo;
        private readonly IConfiguration config;

        public AuthController(ITokenRepository repo, IConfiguration config)
        {
            tokenRepo = repo;
            this.config = config;
        }

        // POST: /api/Auth/Register


        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginRequestDTO request)
        {

            var adminEmail = config["AdminAccount:Username"];
            var hashedPassword = config["AdminAccount:Password"];

            Console.WriteLine(hashedPassword);

            if(request.Username == adminEmail && !string.IsNullOrEmpty(request.Password))
            {
                var passwordHasher = new PasswordHasher<IdentityUser>();
                var result = passwordHasher.VerifyHashedPassword
                    (null, hashedPassword, request.Password);

                if (result == PasswordVerificationResult.Success)
                {
                    var token = tokenRepo.CreateJWTToken(adminEmail, "Admin");
                    return Ok(new { Token = token });
                }
            }

            return Unauthorized("FBI has been notified.");
        }



    }
}
