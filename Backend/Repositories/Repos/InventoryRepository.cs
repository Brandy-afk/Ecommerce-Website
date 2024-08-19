using Microsoft.EntityFrameworkCore;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.DTO.Inventory;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly ZDyesDbContext db;

        public InventoryRepository(ZDyesDbContext db)
        {
            this.db = db;
        }
        public async Task<Inventory> CreateAsync(int amount, Guid productId)
        {
            Inventory inventory = new Inventory() { ProductId = productId, Quantity = amount };
            await db.Inventory.AddAsync(inventory);
            await db.SaveChangesAsync();
            return inventory;
        }

        public async Task<Inventory> CreateWithoutSavingAndAddingAsync(int amount, Guid productId)
        {
            Inventory inventory = new() { ProductId = productId, Quantity = amount };
            return inventory;
        }

        public async Task<Inventory?> GetAsync(Guid productId) => await db.Inventory.FirstOrDefaultAsync(i => i.ProductId == productId);

        public async Task<Inventory?> UpdateAsync(UpdateInventoryDTO request, Guid id)
        {
            Inventory inventory = await GetAsync(id);
            if (inventory != null)
            {
                inventory.Quantity = request.Quantity;
                await db.SaveChangesAsync();
            }

            return inventory;
        }
    }
}
