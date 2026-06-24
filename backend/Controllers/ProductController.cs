using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        // GET: api/product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("catalog/{pagesize:int}")]
        public async Task<ActionResult<CatalogDTO>> GetAllCatalog(int pagesize, [FromQuery] FilterGetDTO filters)
        {
            var result = await _service.GetAllCatalog(pagesize, filters);
            return Ok(result);
        }

        [HttpGet("getpage/{id:int}")]
        public async Task<ActionResult<IEnumerable<ProductCatalogGetDTO>>> GetPageProduct(int id)
        {
            var result = await _service.GetPageProduct(id);
            return Ok(new { products = result });
        }
        [HttpGet("reviews/{id:int}")]
        public async Task<ActionResult<IEnumerable<ProductCatalogGetDTO>>> GetProductReview(int id)
        {
            var uid = User.FindFirst("UserId")?.Value;
            var result = await _service.GetProductReview(id, int.Parse(uid ?? "0"));

            return Ok(new { result });
        }

        // GET: api/product/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/product
        // [HttpPost]
        // public async Task<ActionResult> Create([FromForm] ProductDTO entity)
        // {
        //     await _service.Create(entity);
        //
        //     return CreatedAtAction(
        //         nameof(GetById),
        //         new { id = entity.Id },
        //         entity
        //     );
        // }

        [HttpPost]
        public async Task<ActionResult<ProductDTO>> Create([FromForm] ProductDTO entity)
        {
            var created = await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = created.Id },
                created
            );
        }

        [HttpPost("admin-add")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult<ProductDTO>> CreateAdmin([FromForm(Name = "product")] string productJson,
    [FromForm(Name = "file")] IFormFile? file)
        {
            var options = new System.Text.Json.JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true // Чтобы name -> Name мапилось без проблем
            };
            ProductDTO? productDto;
            try
            {
                productDto = System.Text.Json.JsonSerializer.Deserialize<ProductDTO>(productJson, options);
            }
            catch (System.Text.Json.JsonException)
            {
                return BadRequest("Неверный формат JSON данных в поле product.");
            }
            if (productDto == null)
            {
                return BadRequest("Данные продукта пусты.");
            }
            productDto.file = file;
            var created = await _service.Create(productDto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = created.Id },
                created
            );
        }

        // PUT: api/product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
        [HttpGet("filters")]
        public async Task<ActionResult<IEnumerable<FilterCellDTO>>> GetFilters([FromQuery] string department)
        {
            Console.WriteLine(department);
            var result = await _service.GetAllFilters(department);
            return Ok(result);
        }
        
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ProductSearchDTO>>> Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok(Enumerable.Empty<ProductSearchDTO>());
            }

            var result = await _service.Search(query);

            return Ok(result);
        }
    }
}
