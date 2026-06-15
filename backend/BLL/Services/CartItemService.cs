using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Mappers;
using DefaultNamespace;

public class CartItemService : ICartItemService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<CartItemService> logger;
    private readonly ICartItemRepository _cartitemRepository;

    public CartItemService(IUnitOfWork db, IMapper mapper, ILogger<CartItemService> logger, ICartItemRepository cartItemRepository)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
        _cartitemRepository = cartItemRepository;
    }

    public async Task Create(CartItemDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in CartItemService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            int id = await _cartitemRepository.IsExists((int)entity.ProductId, (int)entity.UserId);

            if (id == 0)
            {
                await db.R_CartItem.Add(mapper.Map<CartItem>(entity));
            }
            else
            {
                var res = await db.R_CartItem.GetById(id);
                res.Quantity+=entity.Quantity;
                entity.Id = id;
                entity.Quantity = res.Quantity;
                mapper.Map(entity, res);
                await db.R_CartItem.Update(res);
            }
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding CartItem in CartItemService");
            throw new ApplicationException("Error adding CartItem", ex);
        }
    }

    public async Task Update(CartItemDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in CartItemService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in CartItemService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_CartItem.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("CartItem with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"CartItem with ID {entity.Id} not found");
            }
            mapper.Map(entity, exists);
            await db.R_CartItem.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating CartItem with ID {Id} in CartItemService", entity.Id);
            throw new ApplicationException("Error updating CartItem", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in CartItemService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_CartItem.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("CartItem with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"CartItem with ID {id} not found");
            }

            await db.R_CartItem.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting CartItem with ID {Id} in CartItemService", id);
            throw new ApplicationException("Error deleting CartItem", ex);
        }
    }

    public async Task<CartItemDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in CartItemService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_CartItem.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("CartItem with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"CartItem with ID {id} not found");
            }

            return mapper.Map<CartItemDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting CartItem with ID {Id} in CartItemService", id);
            throw new ApplicationException("Error getting CartItem", ex);
        }
    }

    public async Task<IEnumerable<CartItemDTO>> GetAll()
    {
        try
        {
            var items = await db.R_CartItem.GetAll();
            if (items == null)
            {
                logger.LogWarning("GetAll returned null in CartItemService");
                return Enumerable.Empty<CartItemDTO>();
            }

            return mapper.Map<IEnumerable<CartItemDTO>>(items);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in CartItemService");
            throw new ApplicationException("Error in GetAll function", ex);
        }
    }

    public async Task<IEnumerable<CartItemPageDTO>> GetAllPage(long id)
    {
        try
        {
            var items = await _cartitemRepository.GetAllUserCart(id);
            if (items == null)
            {
                logger.LogWarning("GetAll returned null in CartItemService");
                return Enumerable.Empty<CartItemPageDTO>();
            }
            var res = items.MapToDtoList();
            return res;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in CartItemService");
            throw new ApplicationException("Error in GetAll function", ex);
        }
    }
}