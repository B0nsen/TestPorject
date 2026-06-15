using backend.BLL.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewImagesController
    {
        private readonly IUserService _service;
    }
}
