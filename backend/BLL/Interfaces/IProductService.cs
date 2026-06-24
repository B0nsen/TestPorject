using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.BLL.Interfaces;

public interface IProductService
{
    Task<ProductDTO> Create(ProductDTO entity);
    Task Update(ProductDTO entity);
    Task Delete(int id);
    Task<ProductDTO> Get(int id);
    Task<IEnumerable<ProductDTO>> GetAll();
    Task<CatalogDTO> GetAllCatalog(int pagesize, FilterGetDTO filters);
    Task<ProductGetDTO> GetPageProduct(int id);
    Task<ProductReviewsDTO> GetProductReview(int id, int userId);
    Task<IEnumerable<FilterCellDTO>> GetAllFilters(string category);
    Task<IEnumerable<ProductSearchDTO>> Search(string query);
}