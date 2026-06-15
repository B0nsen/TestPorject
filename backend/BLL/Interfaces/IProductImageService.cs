using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IProductImageService
{
    Task<ProductImageDTO> Create(ProductImageCreateDTO entity);
    Task Update(ProductImageDTO entity);
    Task Delete(int id);
    Task<ProductImageDTO> Get(int id);
    Task<IEnumerable<ProductImageDTO>> GetAll();
}