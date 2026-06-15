using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<OrderService> logger;

    public OrderService(IUnitOfWork db, IMapper mapper, ILogger<OrderService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(OrderDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in OrderService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_Order.Add(mapper.Map<Order>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Order in OrderService");
            throw new ApplicationException("Error adding Order", ex);
        }
    }

    public async Task Update(OrderDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in OrderService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in OrderService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Order.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Order with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Order with ID {entity.Id} not found");
            }

            mapper.Map(entity, exists);
            await db.R_Order.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Order with ID {Id} in OrderService", entity.Id);
            throw new ApplicationException("Error updating Order", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in OrderService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Order.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Order with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Order with ID {id} not found");
            }

            await db.R_Order.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Order with ID {Id} in OrderService", id);
            throw new ApplicationException("Error deleting Order", ex);
        }
    }

    public async Task<OrderDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in OrderService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Order.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Order with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Order with ID {id} not found");
            }

            return mapper.Map<OrderDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Order with ID {Id} in OrderService", id);
            throw new ApplicationException("Error getting Order", ex);
        }
    }

    public async Task<IEnumerable<OrderDTO>> GetAll()
    {
        try
        {
            var orders = await db.R_Order.GetAll();
            if (orders == null)
            {
                logger.LogWarning("GetAll returned null in OrderService");
                return Enumerable.Empty<OrderDTO>();
            }

            return mapper.Map<IEnumerable<OrderDTO>>(orders);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in OrderService");
            throw new ApplicationException("Error in GetAll function for Order", ex);
        }
    }
}