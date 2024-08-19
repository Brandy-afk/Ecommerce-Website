using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class NewsletterRepository : INewsletterRepository
    {
        private readonly ZDyesDbContext db;

        public NewsletterRepository(ZDyesDbContext db)
        {
            this.db = db;
        }

        public async Task<string> AddAsync(string email) {
            await db.NewsLetter.AddAsync(new Newsletter() { Email = email });
            await db.SaveChangesAsync();
            return email;
        } 
    }
}
