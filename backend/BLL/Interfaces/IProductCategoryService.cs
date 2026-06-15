using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IProductCategoryService
{
    Task Create(ProductCategoryDTO entity);
    Task Delete(int id);
}