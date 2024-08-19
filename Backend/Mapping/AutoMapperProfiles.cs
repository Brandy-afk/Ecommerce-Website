using AutoMapper;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Image;
using ZdyesAPI.Models.DTO.Inventory;
using ZdyesAPI.Models.DTO.Product;

namespace ZdyesAPI.Mapping
{
    public class AutoMapperProfiles : Profile
    {

        public AutoMapperProfiles() {
            CreateMap<ImageDTO, Image>().ReverseMap(); 
            CreateMap<AddProductDTO, Product>().ReverseMap();

            CreateMap<ProductDTO, Product>().ReverseMap()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.Stock, opt => opt.MapFrom(src =>
                src.Disc != null ? src.Disc.Inventory.Quantity :
                src.Clothing != null ? src.Clothing.Inventories.Sum(i => i.Quantity) : 0));
            CreateMap<DiscDTO, Disc>().ReverseMap();
            CreateMap<ClothingDTO, Clothing>().ReverseMap();
            CreateMap<ClothingInventory, ClothingInventoryDTO>().ReverseMap();
            CreateMap<ClothingInventory, ClothingInventoryCreateDTO>().ReverseMap();
        }
    }
}
