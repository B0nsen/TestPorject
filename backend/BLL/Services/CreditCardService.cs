using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class CreditCardService : ICreditCardService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<CreditCardService> logger;

    public CreditCardService(IUnitOfWork db, IMapper mapper, ILogger<CreditCardService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(CreditCardDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in CreditCardService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_CreditCard.Add(mapper.Map<CreditCard>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding CreditCard in CreditCardService");
            throw new ApplicationException("Error adding CreditCard", ex);
        }
    }

    public async Task Update(CreditCardDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in CreditCardService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in CreditCardService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_CreditCard.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("CreditCard with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"CreditCard with ID {entity.Id} not found");
            }
            mapper.Map(entity, exists);
            await db.R_CreditCard.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating CreditCard with ID {Id} in CreditCardService", entity.Id);
            throw new ApplicationException("Error updating CreditCard", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in CreditCardService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_CreditCard.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("CreditCard with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"CreditCard with ID {id} not found");
            }

            await db.R_CreditCard.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting CreditCard with ID {Id} in CreditCardService", id);
            throw new ApplicationException("Error deleting CreditCard", ex);
        }
    }

    public async Task<CreditCardDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in CreditCardService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_CreditCard.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("CreditCard with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"CreditCard with ID {id} not found");
            }

            return mapper.Map<CreditCardDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting CreditCard with ID {Id} in CreditCardService", id);
            throw new ApplicationException("Error getting CreditCard", ex);
        }
    }

    public async Task<IEnumerable<CreditCardDTO>> GetAll()
    {
        try
        {
            var cards = await db.R_CreditCard.GetAll();
            if (cards == null)
            {
                logger.LogWarning("GetAll returned null in CreditCardService");
                return Enumerable.Empty<CreditCardDTO>();
            }

            return mapper.Map<IEnumerable<CreditCardDTO>>(cards);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in CreditCardService");
            throw new ApplicationException("Error in GetAll function for CreditCard", ex);
        }
    }
}