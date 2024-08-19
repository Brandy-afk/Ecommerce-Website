
using Microsoft.AspNetCore.Mvc;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Product;

namespace ZdyesAPI.Repositories.Interfaces
{
    public interface IProductRepository 
    {
        public Task<(List<Product>, int)> GetAllAsync(
                 bool? activeOnly = true,
            List<ProductTypeEnum>? productTypes = null,
            int? pageNumber = 1,
            int? limit = 1000,
            List<string>? colorQuery = null,
            List<ManufacturerEnum>? manufacturers = null,
            List<DiscTypeEnum>? discTypes = null,
            string? nameQuery = null,
            float? minPrice = null,
            float? maxPrice = null,
            bool? inStockOnly = false,
            List<string>? idQuery = null,
            string? sortQuery = null,
            bool? isDescending = false);
        public Task<Product?> GetAsync(Guid id);
        public Task<Product> CreateAsync(AddProductDTO request);
        public Task<Product> CreateWithoutSavingAsync(AddProductDTO request);
        public Task<Product?> UpdateAsync(Guid id, UpdateProductDTO request);
        public Task<Product?> DeleteAsync(Guid id);

        public Task<Product?> UpdateImageId(Guid oldImageId, Guid newImageId);
    }
}
