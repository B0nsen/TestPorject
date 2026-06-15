using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _service;
        private readonly IReviewImagesService _imagesService;

        public ReviewController(IReviewService service, IReviewImagesService imagesService)
        {
            _service = service;
            _imagesService = imagesService;
        }

        // GET: api/review
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("getpage")]
        public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetAllPage()
        {
            var result = await _service.GetAllProductReview();
            return Ok(result);
        }

        // GET: api/review/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ReviewDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/review
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ReviewDTO entity)
        {
            entity.CreatedAt = DateTime.Now;
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateReview([FromForm] CreateReviewDTO entity)
        {
            var uid = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(uid)) return Unauthorized();

            var res = await _service.CreateReview(entity, long.Parse(uid));

            return CreatedAtAction(
                nameof(GetById),
                new { id = res.Id },
                res
            );
        }

        [HttpPut("helpful/{id}")]
        public async Task<ActionResult> AddHelpful(int id)
        {
            var uid = HttpContext.Session.GetString("UserId");
            if(uid == null)
            {
                return Unauthorized();
            }
            bool isAdded = await _service.AddHelpful(id, int.Parse(uid));
            return NoContent();
        }

        // PUT: api/review/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ReviewDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/review/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
