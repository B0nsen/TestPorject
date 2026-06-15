using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class ProductCategoryService : IProductCategoryService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;

    public ProductCategoryService(IUnitOfWork db, IMapper mapper)
    {
        this.db = db;
        this.mapper = mapper;
    }

    public async Task Create(ProductCategoryDTO entity)
    {
        await db.R_ProductCategory.Add(mapper.Map<ProductCategory>(entity));
    }

    public async Task Delete(int id)
    {
        await db.R_ProductCategory.Delete(id);
    }
}