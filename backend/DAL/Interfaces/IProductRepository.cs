using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.DAL.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {

        Task<IEnumerable<Product>> GetAll();
        Task<Product?> GetById(long id);
        Task Add(Product entity);
        Task Update(Product entity);
        Task Delete(long id);
        Task SaveAsync();
        Task<IEnumerable<Product>> GetAllPage(FilterGetDTO filters);
        Task<IEnumerable<Product>> GetAllCategory(string category);
    }
}
