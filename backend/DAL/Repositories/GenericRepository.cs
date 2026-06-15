using backend.DAL.EF;
using backend.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        protected readonly DbContext context;
        protected readonly DbSet<T> dbSet;

        public GenericRepository(DbContext context)
        {
            this.context = context;
            dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await dbSet.AsNoTracking().ToListAsync();
        }
        public async Task<T?> GetById(long id)
        {
            return await dbSet.FindAsync(id);
        }
        public async Task Add(T entity)
        {
            await dbSet.AddAsync(entity);
            await context.SaveChangesAsync();
        }
        public async Task Update(T entity)
        {
            dbSet.Update(entity);
            await context.SaveChangesAsync();
        }
        public async Task Delete(long id)
        {
            var entity = await dbSet.FindAsync(id);
            if (entity != null) dbSet.Remove(entity);
            await context.SaveChangesAsync();
        }
    }
}
