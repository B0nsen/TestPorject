using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class ProductImageRepository : IProductImageRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<ProductImage> _dbSet;

        public ProductImageRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<ProductImage>();
        }

        public async Task<IEnumerable<ProductImage>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<ProductImage?> GetById(long id)
        {
            var list = await _dbSet.Where(p => p.Id == id).ToListAsync();
            return list.FirstOrDefault();
        }

        public Task Add(ProductImage entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(ProductImage entity)
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

        public async Task<ProductImage> GetMain(long id)
        {
            var res = await _dbSet.Where(i => i.IsMain).Where(i => i.Id == id).ToListAsync();
            return res.FirstOrDefault();
        }
    }
}
