

using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Product;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface IClothingRepository
    {

        public Task<Clothing> UpdateAsync(ClothingDTO request, Guid productId);

        public Task<Clothing> GetAsync(Guid productId);
    }
}
