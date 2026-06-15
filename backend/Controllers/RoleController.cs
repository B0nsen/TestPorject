using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _service;

        public RoleController(IRoleService service)
        {
            _service = service;
        }

        // GET: api/role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/role/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/role
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] RoleDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        // PUT: api/role/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RoleDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/role/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
