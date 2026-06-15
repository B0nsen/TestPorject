using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class OrderItemService : IOrderItemService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<OrderItemService> logger;

    public OrderItemService(IUnitOfWork db, IMapper mapper, ILogger<OrderItemService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(OrderItemDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in OrderItemService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_OrderItem.Add(mapper.Map<OrderItem>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding OrderItem in OrderItemService");
            throw new ApplicationException("Error adding OrderItem", ex);
        }
    }

    public async Task Update(OrderItemDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in OrderItemService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in OrderItemService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_OrderItem.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("OrderItem with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"OrderItem with ID {entity.Id} not found");
            }

            mapper.Map(entity, exists);
            await db.R_OrderItem.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating OrderItem with ID {Id} in OrderItemService", entity.Id);
            throw new ApplicationException("Error updating OrderItem", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in OrderItemService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_OrderItem.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("OrderItem with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"OrderItem with ID {id} not found");
            }

            await db.R_OrderItem.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting OrderItem with ID {Id} in OrderItemService", id);
            throw new ApplicationException("Error deleting OrderItem", ex);
        }
    }

    public async Task<OrderItemDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in OrderItemService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_OrderItem.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("OrderItem with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"OrderItem with ID {id} not found");
            }

            return mapper.Map<OrderItemDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting OrderItem with ID {Id} in OrderItemService", id);
            throw new ApplicationException("Error getting OrderItem", ex);
        }
    }

    public async Task<IEnumerable<OrderItemDTO>> GetAll()
    {
        try
        {
            var items = await db.R_OrderItem.GetAll();
            if (items == null)
            {
                logger.LogWarning("GetAll returned null in OrderItemService");
                return Enumerable.Empty<OrderItemDTO>();
            }

            return mapper.Map<IEnumerable<OrderItemDTO>>(items);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in OrderItemService");
            throw new ApplicationException("Error in GetAll function for OrderItem", ex);
        }
    }
}