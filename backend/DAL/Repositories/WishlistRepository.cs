using backend.DAL.EF;
using backend.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DefaultNamespace;

public class WishlistRepository : IWishlistRepository
{
    private readonly AmazonContext context;

    public WishlistRepository(AmazonContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<Wishlist>> GetAll()
    {
        return await context.T_Wishlist
            .Include(w => w.Items)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Images)
            .Include(w => w.Items)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Reviews)
            .AsSplitQuery()
            .ToListAsync();
    }

    public async Task<Wishlist?> GetById(long id)
    {
        return await context.T_Wishlist
            .Include(w => w.Items)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Images)
            .Include(w => w.Items)
                .ThenInclude(i => i.Product)
                    .ThenInclude(p => p.Reviews)
            .AsSplitQuery()
            .FirstOrDefaultAsync(w => w.Id == id);
    }

    public async Task Add(Wishlist entity)
    {
        await context.T_Wishlist.AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task Update(Wishlist entity)
    {
        context.T_Wishlist.Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task Delete(long id)
    {
        var entity = await context.T_Wishlist.FindAsync(id);

        if (entity == null)
        {
            return;
        }

        context.T_Wishlist.Remove(entity);
        await context.SaveChangesAsync();
    }
}
