using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<Address> _dbSet;

        public AddressRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<Address>();
        }

        public async Task<IEnumerable<Address>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Address?> GetById(long id)
        {
            var list = await _dbSet.Where(c => c.Id == id).AsNoTracking().ToListAsync();
            return list.FirstOrDefault();
        }

        public async Task<Address?> GetByUserId(long id)
        {
            var list = await _dbSet.Include(a => a.User).Where(a => a.User.Id == id).AsNoTracking().ToListAsync();
            return list.FirstOrDefault();
        }

        public Task Add(Address entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(Address entity)
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
    }
}
