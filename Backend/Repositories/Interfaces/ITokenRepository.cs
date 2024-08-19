using Microsoft.AspNetCore.Identity;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface ITokenRepository
    {
        string CreateJWTToken(string email, string role);

    }
}
