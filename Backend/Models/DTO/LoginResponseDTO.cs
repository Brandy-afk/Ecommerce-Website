namespace ZDyes.Models.DTO
{
    public class LoginResponseDTO
    {
        public LoginResponseDTO(string? token)
        {
            this.JwtToken = token ?? "";
        }
        public string JwtToken { get; set; }
    }
}
