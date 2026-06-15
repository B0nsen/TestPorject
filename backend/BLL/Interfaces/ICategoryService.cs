using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface ICategoryService
{
    Task Create(CreateCategoryDTO entity);
    Task Update(CategoryDTO entity);
    Task Delete(int id);
    Task<CategoryDTO> Get(int id);
    Task<IEnumerable<CategoryDTO>> GetAll();
}