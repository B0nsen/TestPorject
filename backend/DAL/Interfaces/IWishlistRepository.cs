using DefaultNamespace;

namespace backend.DAL.Interfaces;

public interface IWishlistRepository
{
    Task<IEnumerable<Wishlist>> GetAll();
    Task<Wishlist?> GetById(long id);
    Task Add(Wishlist entity);
    Task Update(Wishlist entity);
    Task Delete(long id);
}
