using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Product;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class DiscRepository : IDiscRepository
    {
        private readonly IMapper mapper;
        private readonly ZDyesDbContext db;

        public DiscRepository(IMapper mapper, ZDyesDbContext db)
        {
            this.mapper = mapper;
            this.db = db;
        }



        public async Task<Disc?> GetAsync(Guid productId) => await db.Discs.FindAsync(productId);

        public async Task<Disc?> UpdateAsync(DiscDTO request, Guid productId)
        {
           var disc = await GetAsync(productId);
            if (disc != null)
            {
                disc.Thickness = request.Thickness;
                disc.Weight = request.Weight;
                disc.Custom = request.Custom;
                disc.DiscType = request.DiscType;
                disc.Diameter = request.Diameter;
                await db.SaveChangesAsync();
            }

            return disc;
        }
    }
}
