using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Inventory;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface IClothingInventoryRepository
    {
        public Task<ClothingInventory> CreateAsync(ClothingInventoryDTO request, Guid productId);
        public Task<List<ClothingInventory>> CreateMultipleAsync(IList<ClothingInventoryDTO> requests, Guid productId);
        public Task<List<ClothingInventory>> CreateMultipleWithoutSavingOrAddingAsync(IList<ClothingInventoryDTO> requests, Guid productId);
        public Task<List<ClothingInventory>?> UpdateAsync(ClothingInventoryUpdateDTO request, Guid productId);
        public Task<ClothingInventory?> GetAsync(SizeEnum size, Guid productId);
        public Task<ClothingInventory?> RemoveAsync(SizeEnum size, Guid id);
    }
}
