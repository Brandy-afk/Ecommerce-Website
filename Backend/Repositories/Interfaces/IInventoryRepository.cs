using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.DTO.Inventory;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface IInventoryRepository
    {
        public Task<Inventory> CreateAsync(int amount, Guid productId);
        public Task<Inventory> CreateWithoutSavingAndAddingAsync(int amount, Guid productId);
        public Task<Inventory?> UpdateAsync(UpdateInventoryDTO request, Guid id);
        public Task<Inventory?> GetAsync(Guid productId);
    }
}
