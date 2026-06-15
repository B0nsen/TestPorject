using backend.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.BLL.DTO;
using backend.DAL.EF;
using DefaultNamespace;
using System.Threading.Tasks;

namespace backend.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<User> _dbSet;

        public UserRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<User>();
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _dbSet.Include(u => u.Addresses).Include(u => u.Role).ToListAsync();
        }

        public async Task<User?> GetById(long id)
        {
            var list = await _dbSet.Include(u => u.Addresses).Include(u => u.Role).Where(u => u.Id == id).ToListAsync();
            return list.FirstOrDefault();
        }

        public Task Add(User entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(User entity)
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

        public async Task<bool> EmailExists(string email)
        {
            return await _context.T_User.AnyAsync(u => u.Email.ToLower() == email);
        }

        // public async Task<User?> GetByEmail(string email)
        // {
        //     return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        // }

        
        public async Task<UserEntityDTO?> GetByEmail(string email)
        {
            return await _context.T_User
                .Where(u => u.Email == email)
                .Select(u => new UserEntityDTO
                {
                    Id = u.Id,
                    Email = u.Email,
                    HashPassword = u.HashPassword,
                    Salt = u.Salt,
                    EmailConfirmed = u.EmailConfirmed,
                    RoleId = u.RoleId
                })
                .FirstOrDefaultAsync();
        }
        public async Task SaveAsync()
        {
            // Сохраняем все изменения разом
            await _context.SaveChangesAsync();
        }
    }
}