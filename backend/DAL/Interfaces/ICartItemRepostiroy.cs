using DefaultNamespace;

namespace backend.DAL.Interfaces
{
    public interface ICartItemRepository : IRepository<CartItem>
    {
        Task<IEnumerable<CartItem>> GetAll();
        Task<IEnumerable<CartItem>> GetAllUserCart(long id);
        Task<CartItem?> GetById(long id);
        Task Add(CartItem entity);
        Task Update(CartItem entity);
        Task Delete(long id);
        Task SaveAsync();
        Task<int> IsExists(int productId, int userId);
    }
}
