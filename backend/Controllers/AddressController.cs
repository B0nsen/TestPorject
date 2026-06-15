using backend.BLL.DTO;
using backend.BLL.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _service;
        private readonly IUserService _userService;
        public AddressController(IAddressService service, IUserService userService)
        {
            _service = service;
            _userService = userService;
        }
        // GET: api/address
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }
        // GET: api/address/id
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }
        // POST: api/address
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] AddressDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }
        // PUT: api/address/id
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AddressDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }
        // DELETE: api/address/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }

        [HttpPut("info")]
        public async Task<IActionResult> UpdateInfo([FromBody] UpdateAddressInfoDTO entity)
        {
            var uid = HttpContext.Session.GetString("UserId");
            var user = await _userService.Get(int.Parse(uid));
            var address = await _service.GetByUserId(int.Parse(uid));
            
            user.Name = entity.firstName + " " + entity.lastName;
            user.Phone = entity.phone;

            await _userService.Update(user);

            address.Country = entity.country;
            address.City = entity.city;
            address.PostalCode = entity.postalCode;
            address.Street = entity.street;
            address.HouseNumber = int.Parse(entity.houseNumber);
            

            await _service.Update(address);
            return NoContent();
        }
        
        
        [HttpGet("test-db")]
        public async Task<IActionResult> TestDb()
        {
            try
            {
                var cs = "Server=10.198.221.211;Port=3306;Database=amazondb;User ID=testuser;Password=test;Protocol=Tcp;SslMode=Preferred;AllowPublicKeyRetrieval=True;Connection Timeout=60;Default Command Timeout=60;Pooling=false;";

                await using var conn = new MySqlConnector.MySqlConnection(cs);
                await conn.OpenAsync();

                await using var cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT COUNT(*) FROM t_address";

                var count = await cmd.ExecuteScalarAsync();

                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message,
                    inner = ex.InnerException?.Message,
                    type = ex.GetType().FullName
                });
            }
        }
        
        [HttpGet("test-tcp")]
        public async Task<IActionResult> TestTcp()
        {
            try
            {
                using var client = new System.Net.Sockets.TcpClient();
                await client.ConnectAsync("10.198.221.211", 3306);

                return Ok(new { connected = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message,
                    type = ex.GetType().FullName
                });
            }
        }



    }
}
