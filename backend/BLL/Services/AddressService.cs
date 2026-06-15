using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.Extensions.Logging;

namespace backend.BLL.Services;

public class AddressService : IAddressService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<AddressService> logger;
    private readonly IAddressRepository _addressRepository;

    public AddressService(IUnitOfWork db, IMapper mapper, ILogger<AddressService> logger, IAddressRepository addressRepository)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
        _addressRepository = addressRepository;
    }

    public async Task Create(AddressDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in AddressService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_Address.Add(mapper.Map<Address>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Address in AddressService");
            throw new ApplicationException("Error adding Address", ex);
        }
    }

    public async Task Update(AddressDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in AddressService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in AddressService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Address.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Address with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Address with ID {entity.Id} not found");
            }

            mapper.Map(entity, exists);
            await db.R_Address.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Address with ID {Id} in AddressService", entity.Id);
            throw new ApplicationException("Error updating Address", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in AddressService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Address.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Address with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Address with ID {id} not found");
            }

            await db.R_Address.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Address with ID {Id} in AddressService", id);
            throw new ApplicationException("Error deleting Address", ex);
        }
    }

    public async Task<AddressDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in AddressService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Address.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Address with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Address with ID {id} not found");
            }

            return mapper.Map<AddressDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Address with ID {Id} in AddressService", id);
            throw new ApplicationException("Error getting Address", ex);
        }
    }

    public async Task<IEnumerable<AddressDTO>> GetAll()
    {
        try
        {
            var addresses = await db.R_Address.GetAll();
            if (addresses == null)
            {
                logger.LogWarning("GetAll returned null in AddressService");
                return Enumerable.Empty<AddressDTO>();
            }

            return mapper.Map<IEnumerable<AddressDTO>>(addresses);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in AddressService");
            throw new ApplicationException("Error in GetAll function for Address", ex);
        }
    }

    public async Task<AddressDTO> GetByUserId(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in AddressService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await _addressRepository.GetByUserId(id);
            if (entity == null)
            {
                logger.LogWarning("Address with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Address with ID {id} not found");
            }

            return mapper.Map<AddressDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Address with ID {Id} in AddressService", id);
            throw new ApplicationException("Error getting Address", ex);
        }
    }
}