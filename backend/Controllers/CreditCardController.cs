using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreditCardController : ControllerBase
    {
        private readonly ICreditCardService _service;

        public CreditCardController(ICreditCardService service)
        {
            _service = service;
        }

        // GET: api/creditcard
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreditCardDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/creditcard/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CreditCardDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/creditcard
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreditCardDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        // PUT: api/creditcard/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreditCardDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/creditcard/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
        
        
        [HttpPost("add")]
        public async Task<ActionResult> Create([FromBody] CreditCardCreateDTO entity)
        {
            var userIdString = User.FindFirst("UserId")?.Value;

            if (!long.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var creditCard = new CreditCardDTO
            {
                CardNumber = entity.CardNumber,
                HolderName = entity.HolderName,
                Expiry = entity.Expiry,
                Cvv = entity.Cvv,
                UserId = userId
            };

            await _service.Create(creditCard);

            return Ok(creditCard);
        }
    }
}
