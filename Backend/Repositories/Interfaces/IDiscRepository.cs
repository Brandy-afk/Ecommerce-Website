

using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Product;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface IDiscRepository
    {

        public Task<Disc?> UpdateAsync(DiscDTO request, Guid productId);

        public Task<Disc?> GetAsync(Guid productId);


    }
}
