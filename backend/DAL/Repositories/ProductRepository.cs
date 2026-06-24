using Amazon.S3.Model;
using backend.BLL.DTO;
using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<Product> _dbSet;

        public ProductRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<Product>();
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _dbSet.Include(p => p.Images).Include(p => p.Reviews).ThenInclude(r => r.User).Include(p => p.ProductCategories).ThenInclude(c => c.Category).Include(p => p.Reviews).ThenInclude(r => r.ReviewImages).ToListAsync();
        }

        public async Task<Product?> GetById(long id)
        {
            var list = await _dbSet.Include(p => p.Images).Include(p => p.Reviews).ThenInclude(r => r.User).Include(p => p.Reviews).ThenInclude(r => r.ReviewImages).Where(p => p.Id == id).ToListAsync();
            return list.FirstOrDefault();
        }

        public Task Add(Product entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(Product entity)
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
        public async Task<IEnumerable<Product>> GetAllCategory(string category)
        {
            var query = _dbSet.AsNoTracking();
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.ProductCategories.Any(pc => pc.Category.Name == category));
            }
            var res = await query.Include(p => p.ProductCategories).ThenInclude(c => c.Category).AsSplitQuery().OrderBy(p => p.Id).ToListAsync();
            return res;
        }
        public async Task <IEnumerable<Product>> GetAllPage(FilterGetDTO filters)
        {
            var query = _dbSet.AsNoTracking();
            if (!string.IsNullOrEmpty(filters.Department))
            {
                query = query.Where(p => p.ProductCategories.Any(pc => pc.Category.Name == filters.Department));
            }
            if (filters.search != null)
            {
                query = query.Where(p => p.Name.Contains(filters.search));
            }
            if (filters.Brand != null && filters.Brand.Any())
            {
                query = query.Where(p => filters.Brand.Contains(p.Brand));
            }
            if(filters.Condition != null && filters.Condition.Any())
            {
                query = query.Where(p => filters.Condition.Contains(p.Condition));
            }
            if (filters.price_min != 0)
            {
                query = query.Where(p => p.Price >= filters.price_min);
            }
            if (filters.price_max != 0)
            {
                query = query.Where(p => p.Price <= filters.price_max);
            }
            if (filters.rating > 0)
            {
                query = query.Where(p => p.Reviews.Average(r => r.Rating) >= filters.rating);
            }
            var res = await query.Include(p => p.Images).Include(p => p.Reviews).ThenInclude(r => r.User).Include(p => p.ProductCategories).ThenInclude(c => c.Category).Include(p => p.Reviews).ThenInclude(r => r.ReviewImages).AsSplitQuery().OrderBy(p => p.Id).ToListAsync();
            return res;
        }
    }
}
