using DefaultNamespace;

namespace backend.DAL.Interfaces
{
    public interface IProductImageRepository
    {
        Task<IEnumerable<ProductImage>> GetAll();
        Task<ProductImage?> GetById(long id);
        Task Add(ProductImage entity);
        Task Update(ProductImage entity);
        Task Delete(long id);
        Task SaveAsync();
        Task<ProductImage?> GetMain(long id);
    }
}
