using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Mappers;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.BLL.Services
{
    public class HomepageService : IHomepageService
    {
        private readonly IUnitOfWork db;
        private readonly ILogger<HomepageService> logger;
        private readonly IProductRepository _productRepository;

        public HomepageService(IUnitOfWork db, ILogger<HomepageService> logger, IProductRepository productRepository)
        {
            this.db = db;
            this.logger = logger;
            _productRepository = productRepository;
        }
        public async Task<HomepageDTO> Get()
        {
            IEnumerable<Product> products = await _productRepository.GetAll();
            IEnumerable<Category> categories = await db.R_Category.GetAll();
            HomepageDTO homePage = HomepageMapper.toHomePageDTO(products.ToList(), categories.ToList());
            return homePage;
        }
    }
}
