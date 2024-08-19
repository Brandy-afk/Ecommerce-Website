using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZdyesAPI.Models.Domain.Products;
using ZdyesAPI.Models.DTO.Product;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClothingController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IClothingRepository clothingRepository;

        public ClothingController(IMapper mapper, IClothingRepository clothingRepository)
        {
            this.mapper = mapper;
            this.clothingRepository = clothingRepository;
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateClothing([FromRoute] Guid id, [FromBody] ClothingDTO request)
        {
            Clothing clothing = await clothingRepository.UpdateAsync(request, id);
            if (clothing == null)
                return NotFound();

            return Ok(clothing);
        }
    }
}
