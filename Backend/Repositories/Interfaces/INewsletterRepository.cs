namespace ZdyesAPI.Repositories.Interfaces
{
    public interface INewsletterRepository
    {

        public Task<string> AddAsync(string email);

    }
}
