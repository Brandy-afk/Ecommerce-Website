using Microsoft.EntityFrameworkCore;
using ZdyesAPI.Data;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Inventory;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Repositories.Repos
{
    public class ClothingInventoryRepository : IClothingInventoryRepository
    {
        private readonly ZDyesDbContext db;

        public ClothingInventoryRepository(ZDyesDbContext db)
        {
            this.db = db;
        }
        public async Task<ClothingInventory> CreateAsync(ClothingInventoryDTO request, Guid productId)
        {
            ClothingInventory inventory = new ClothingInventory() { ProductId = productId, Quantity = request.Quantity, Size = request.Size  };
            await db.ClothingInventory.AddAsync(inventory);
            await db.SaveChangesAsync();
            return inventory;
        }


        public async Task<List<ClothingInventory>> CreateMultipleAsync(IList<ClothingInventoryDTO> requests, Guid productId)
        {
            List<ClothingInventory> newInventory = new List<ClothingInventory>();
            foreach (var request in requests)
            {
               newInventory.Add(new ClothingInventory() { ProductId = productId, Quantity = request.Quantity, Size = request.Size });
            }

            await db.ClothingInventory.AddRangeAsync(newInventory);
            await db.SaveChangesAsync();
            return newInventory;
        }

        public async Task<List<ClothingInventory>> CreateMultipleWithoutSavingOrAddingAsync(IList<ClothingInventoryDTO> requests, Guid productId)
        {
            List<ClothingInventory> newInventory = new List<ClothingInventory>();
            foreach (var request in requests)
            {
                newInventory.Add(new ClothingInventory() { ProductId = productId, Quantity = request.Quantity, Size = request.Size });
            }
            return newInventory;
        }

        public async Task<ClothingInventory?> GetAsync(SizeEnum size, Guid id) =>
            await db.ClothingInventory.FirstOrDefaultAsync(x => x.ProductId == id && x.Size == size);

        public async Task<ClothingInventory?> RemoveAsync(SizeEnum size, Guid id)
        {
            var inventory = await GetAsync(size, id);
            if (inventory != null)
            {
                return await RemoveAsync(inventory);
            }

            return null;
        }

        public async Task<ClothingInventory> RemoveAsync(ClothingInventory clothingInventory)
        {
            db.ClothingInventory.Remove(clothingInventory);
            await db.SaveChangesAsync();
            return clothingInventory;
        }

        #region Update
        public async Task<List<ClothingInventory>?> UpdateAsync(ClothingInventoryUpdateDTO request, Guid productId)
        {
            List<ClothingInventory> currentInventories = await GetCurrentInventoriesAsync(productId);
            if (currentInventories.Count == 0) { return null; }

            Dictionary<SizeEnum, int> requestMap = CreateRequestMap(request);

            using var transaction = await db.Database.BeginTransactionAsync();

            try
            {
                await UpdateExistingInventoriesAsync(currentInventories, requestMap);
                await AddNewInventoriesAsync(currentInventories, requestMap, productId);
                await db.SaveChangesAsync();
                await transaction.CommitAsync();
                return currentInventories;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                return null;
            }
        }

        private async Task<List<ClothingInventory>> GetCurrentInventoriesAsync(Guid productId)
        {
            return await db.ClothingInventory.Where(i => i.ProductId == productId).ToListAsync();
        }

        private Dictionary<SizeEnum, int> CreateRequestMap(ClothingInventoryUpdateDTO request)
        {
            return request.Inventories.ToDictionary(i => i.Size, i => i.Quantity);
        }

        private async Task UpdateExistingInventoriesAsync(List<ClothingInventory> currentInventories, Dictionary<SizeEnum, int> requestMap)
        {
            List<ClothingInventory> toRemove = new();
            foreach (var inventory in currentInventories)
            {
                if (requestMap.TryGetValue(inventory.Size, out int quantity))
                {
                    inventory.Quantity = quantity;
                    requestMap.Remove(inventory.Size);
                }
                else
                {
                    await RemoveAsync(inventory);
                    toRemove.Add(inventory);
                }
            }
            foreach (var inventory in toRemove)
            {
                currentInventories.Remove(inventory);
            }
        }

        private async Task AddNewInventoriesAsync(List<ClothingInventory> currentInventories, Dictionary<SizeEnum, int> requestMap, Guid productId)
        {
            foreach (var pair in requestMap)
            {
                var newInventory = await CreateAsync(new ClothingInventoryDTO { Quantity = pair.Value, Size = pair.Key }, productId);
                currentInventories.Add(newInventory);
            }
        }

        #endregion
    }
}
