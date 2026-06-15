namespace DefaultNamespace;

using backend.DAL.EF;
using backend.DAL.Interfaces;
using backend.DAL.Repositories;
using Microsoft.EntityFrameworkCore;



public class OrderRepository : GenericRepository<Order>, IOrderRepository
{
    private readonly AmazonContext context;

    public OrderRepository(AmazonContext context) : base(context)
    {
        this.context = context;
    }

    public new async Task<IEnumerable<Order>> GetAll()
    {
        return await context.T_Order
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ThenInclude(p => p.Images)
            .ToListAsync();
    }

    public new async Task<Order?> GetById(long id)
    {
        return await context.T_Order
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ThenInclude(p => p.Images)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
}
