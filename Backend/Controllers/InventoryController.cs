using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.DTO.Inventory;
using ZdyesAPI.Repositories.Interfaces;

namespace ZdyesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IInventoryRepository inventoryRepository;
        private readonly IClothingInventoryRepository clothingInventoryRepository;

        public InventoryController(IMapper mapper, IInventoryRepository inventoryRepository, IClothingInventoryRepository clothingInventoryRepository)
        {
            this.mapper = mapper;
            this.inventoryRepository = inventoryRepository;
            this.clothingInventoryRepository = clothingInventoryRepository;
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateInventory([FromRoute] Guid id, [FromBody] UpdateInventoryDTO request)
        {
            Inventory inventory = await inventoryRepository.UpdateAsync(request, id);
            if (inventory == null)
                return NotFound();

            return Ok(inventory);
        }

        [HttpPut]
        [Route("clothing/{id:guid}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateClothingInventory([FromRoute] Guid id, [FromBody] ClothingInventoryUpdateDTO request)
        {
            List<ClothingInventory> inventory = await clothingInventoryRepository.UpdateAsync(request, id);
            if (inventory == null)
                return NotFound();

            return Ok(inventory);
        }


    }
}
