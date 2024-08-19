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
    public class DiscController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IDiscRepository discRepo;

        public DiscController(IMapper mapper, IDiscRepository discRepo)
        {
            this.mapper = mapper;
            this.discRepo = discRepo;
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateDisc([FromRoute] Guid id, [FromBody] DiscDTO request)
        {
            Disc updatedDisc = await discRepo.UpdateAsync(request, id);
            if (updatedDisc == null)
                return NotFound();

            return Ok(updatedDisc);
        }

    }
}
