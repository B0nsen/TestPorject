using backend.Models;
namespace backend.DAL.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T?> GetById(long id);
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(long id);
    }
}