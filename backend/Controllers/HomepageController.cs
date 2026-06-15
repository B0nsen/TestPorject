using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomepageController :ControllerBase
    {
        
        private readonly IHomepageService _service;
        public HomepageController(IHomepageService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult<HomepageDTO>> Get()
        {
            return Ok(await _service.Get());
        }
    }
}
