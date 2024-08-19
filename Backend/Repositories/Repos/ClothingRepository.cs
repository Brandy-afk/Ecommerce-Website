using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Product;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class ClothingRepository : IClothingRepository
    {
        private readonly IMapper mapper;
        private readonly ZDyesDbContext db;

        public ClothingRepository(IMapper mapper, ZDyesDbContext db)
        {
            this.mapper = mapper;
            this.db = db;
        }


        public async Task<Clothing> GetAsync(Guid productId) => await db.Clothing.FindAsync(productId);

        public async Task<Clothing> UpdateAsync(ClothingDTO request, Guid productId)
        {
           var clothing = await GetAsync(productId);
            if (clothing != null)
            {
                clothing.ClothingType = request.ClothingType;
                clothing.Wool = request.Wool;
                clothing.Cotton = request.Cotton;
                clothing.Polyester = request.Polyester;
                clothing.Linen = request.Linen;
                await db.SaveChangesAsync();
            }

            return clothing;
        }
    }
}
