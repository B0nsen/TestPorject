namespace DefaultNamespace;

using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;


    [ApiController]
    [Route("api/[controller]")]
    public class WishlistItemController : ControllerBase
    {
        private readonly IWishlistItemService _service;
        private readonly IWishlistService _wishlistService;

        public WishlistItemController(IWishlistItemService service, IWishlistService wishlistService)
        {
            _service = service;
            _wishlistService = wishlistService;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishlistItemDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishlistItemDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

       [HttpPost]
public async Task<ActionResult> Create([FromBody] WishlistItemCreateDTO entity)
{
        var userIdString = User.FindFirst("UserId")?.Value;

        if (!long.TryParse(userIdString, out var userId))
    {
        return Unauthorized();
    }

    var wishlists = await _wishlistService.GetAll();
    var wishlist = wishlists.FirstOrDefault(w => w.Id == entity.WishlistId);

    if (wishlist == null)
    {
        return NotFound("Wishlist not found");
    }

    if (wishlist.UserId != userId)
    {
        return Forbid();
    }

    var alreadyExists = wishlist.Items.Any(i => i.ProductId == entity.ProductId);

    if (alreadyExists)
    {
        return Conflict("Product already exists in wishlist");
    }

    await _service.Create(new WishlistItemDTO
    {
        WishlistId = entity.WishlistId,
        ProductId = entity.ProductId
    });

    return Ok();
}


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] WishlistItemDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }

