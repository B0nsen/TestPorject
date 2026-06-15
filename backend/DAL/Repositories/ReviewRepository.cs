using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<Review> _dbSet;

        public ReviewRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<Review>();
        }

        public async Task<IEnumerable<Review>> GetAll()
        {
            return await _dbSet.Include(r => r.User).Include(r => r.Product).Include(r => r.ReviewImages).ToListAsync();
        }

        public async Task<Review?> GetById(long id)
        {
            var list = await _dbSet.Include(r => r.User).Include(r => r.Product).Include(r => r.UsersLiked).Include(r => r.ReviewImages).Where(r => r.Id == id).ToListAsync();
            return list.FirstOrDefault();
        }

        public async Task<bool> HasReview(int uid, int productId)
        {
            Console.WriteLine(await _dbSet.Include(r => r.User).Include(r => r.Product).AnyAsync(r => r.UserId == uid && r.ProductId == productId));
            return await _dbSet.Include(r => r.User).Include(r => r.Product).AnyAsync(r => r.UserId == uid && r.ProductId == productId);
        }

        public Task Add(Review entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(Review entity)
        {
            _dbSet.Update(entity);
            return Task.CompletedTask;
        }

        public Task Delete(long id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
                _dbSet.Remove(entity);
            return Task.CompletedTask;
        }
        public async Task SaveAsync()
        {
            // Сохраняем все изменения разом
            await _context.SaveChangesAsync();
        }
    }
}
