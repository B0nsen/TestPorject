using backend.BLL.DTO;
using backend.BLL.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;
using static Amazon.S3.Util.S3EventNotification;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemService _service;

        public CartItemController(ICartItemService service)
        {
            _service = service;
        }

        // GET: api/cartitem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItemDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/cartitem/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CartItemDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/cartitem
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CartItemDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        // PUT: api/cartitem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CartItemDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/cartitem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }

        [HttpGet("cart")]
        public async Task<ActionResult<IEnumerable<CartDTO>>> GetAllCart()
        {
            var uid = HttpContext.Session.GetString("UserId");
            Console.WriteLine(uid);
            var res = await _service.GetAllPage(long.Parse(uid));
            var items = new CartDTO()
            {
                Items = res.ToList(),
                Shipping = 10,
            };
            return Ok(items);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateCartItem([FromBody] CreateCartItemDTO entity)
        {
            CartItemDTO res = new CartItemDTO()
            {
                ProductId = entity.ProductId,
                Quantity = entity.Quantity,
            };
            var uid = HttpContext.Session.GetString("UserId");
            res.UserId = long.Parse(uid);
            
            await _service.Create(res);

            return CreatedAtAction(
                nameof(GetById),
                new { id = res.Id },
                res
            );
        }

        [HttpPut("add/{id}")]
        public async Task<IActionResult> add(int id)
        {
            var result = await _service.Get(id);
            result.Quantity++;

            await _service.Update(result);
            return NoContent();
        }

        [HttpPut("sub/{id}")]
        public async Task<IActionResult> sub(int id)
        {
            var result = await _service.Get(id);
            result.Quantity--;

            await _service.Update(result);
            return NoContent();
        }
    }
}
