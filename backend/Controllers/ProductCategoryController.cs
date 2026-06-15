using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _service;

        public ProductCategoryController(IProductCategoryService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ProductCategoryDTO entity)
        {
            await _service.Create(entity);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] long productId, [FromQuery] long categoryId)
        {
            //await _service.Delete(productId, categoryId);
            return NoContent();
        }
    }
}