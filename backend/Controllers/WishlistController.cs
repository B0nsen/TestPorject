using backend.BLL.DTO;
using backend.BLL.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _service;

        public WishlistController(IWishlistService service)
        {
            _service = service;
        }

        // GET: api/wishlist
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishlistDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/wishlist/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WishlistDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/wishlist
        // [HttpPost]
        // public async Task<ActionResult> Create([FromBody] WishlistDTO entity)
        // {
        //     await _service.Create(entity);
        //
        //     return CreatedAtAction(
        //         nameof(GetById),
        //         new { id = entity.Id },
        //         entity
        //     );
        // }
        
        
        // [HttpPost]
        // public async Task<ActionResult> Create([FromBody] WishlistDTO entity)
        // {
        //     var userId = HttpContext.Session.GetString("UserId");
        //
        //     if (userId == null)
        //     {
        //         return Unauthorized();
        //     }
        //
        //     entity.UserId = userId.Value;
        //
        //     await _service.Create(entity);
        //
        //     return CreatedAtAction(
        //         nameof(GetById),
        //         new { id = entity.Id },
        //         entity
        //     );
        // }
        
        
        [HttpPost]
        public async Task<ActionResult<WishlistDTO>> Create([FromBody] WishlistCreateDTO entity)
        {
            var userIdString = HttpContext.Session.GetString("UserId");

            if (!long.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var created = await _service.Create(new WishlistDTO
            {
                UserId = userId,
                Name = entity.Name
            });

            return CreatedAtAction(
                nameof(GetById),
                new { id = created.Id },
                created
            );
        }


        
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<WishlistDTO>>> GetMy()
        {
            var userId = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var result = await _service.GetAll();
            return Ok(result.Where(w => w.UserId == long.Parse(userId)));
        }



        // PUT: api/wishlist/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] WishlistUpdateDTO entity)
        {
            var userIdString = HttpContext.Session.GetString("UserId");

            if (!long.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var wishlist = await _service.Get(id);

            if (wishlist.UserId != userId)
            {
                return Forbid();
            }

            wishlist.Name = entity.Name;

            await _service.Update(wishlist);

            return NoContent();
        }
        
        // DELETE: api/wishlist/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            
            var userIdString = HttpContext.Session.GetString("UserId");
            
            if (!long.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var wishlist = await _service.Get(id);

            if (wishlist.UserId != userId)
            {
                return Forbid();
            }
            
            
            await _service.Delete(id);
            return NoContent();
        }
    }
}
