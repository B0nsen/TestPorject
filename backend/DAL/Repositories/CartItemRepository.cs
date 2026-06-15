using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<CartItem> _dbSet;

        public CartItemRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<CartItem>();
        }

        public async Task<IEnumerable<CartItem>> GetAll()
        {
            return await _dbSet.Include(c => c.Product).ThenInclude(p => p.Images).Include(c => c.User).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<CartItem>> GetAllUserCart(long id)
        {
            return await _dbSet.Include(c => c.Product).ThenInclude(p => p.Images).Include(c => c.User).Where(c => c.UserId == id).AsNoTracking().ToListAsync();
        }

        public async Task<CartItem?> GetById(long id)
        {
            var list = await _dbSet.Include(c => c.Product).ThenInclude(p => p.Images).Include(c => c.User).Where(c => c.Id == id).AsNoTracking().ToListAsync();
            return list.FirstOrDefault();
        }

        public Task Add(CartItem entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(CartItem entity)
        {
            var existing = _dbSet.Local.FirstOrDefault(e => e.Id == entity.Id);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(entity);
            }
            else
            {
                _context.Update(entity);
            }
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

        public async Task<int> IsExists(int productId, int userId)
        {
            if(await _dbSet.AnyAsync(c => c.ProductId == productId && c.UserId == userId))
            {
                return (int)_dbSet.Where(c => c.ProductId == productId && c.UserId == userId).Select(c => c.Id).FirstOrDefault();
            }
            else
            {
                return 0;
            }
        }
    }
}
