
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration config;

        public TokenRepository(IConfiguration config)
        {
            this.config = config;
        }

        public string CreateJWTToken(string email, string role)
        {
            //Create claims

            var claims = new[]
             {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
             };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                config["Jwt:Issuer"],
                config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
