using DefaultNamespace;

namespace backend.DAL.Interfaces
{
    public interface IReviewRepository : IRepository<Review>
    {
        Task<IEnumerable<Review>> GetAll();
        Task<Review?> GetById(long id);
        Task<bool> HasReview(int uid, int productId);
        Task Add(Review entity);
        Task Update(Review entity);
        Task Delete(long id);
        Task SaveAsync();
    }
}
