using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.DAL;
using DefaultNamespace;
using backend.DAL.Repositories;
using backend.Mappers;
using Microsoft.EntityFrameworkCore;
using AspNetCoreGeneratedDocument;
using Microsoft.Identity.Client.Extensions.Msal;
using System.Security.Cryptography;
using System.Text;
using static Amazon.S3.Util.S3EventNotification;

public class UserService : IUserService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<UserService> logger;
    private readonly IUserRepository _userRepository;
    private readonly IReviewRepository _reviewRepository;
    private readonly IFileStorageService storage;
    private readonly IEmailService emailService;

    public UserService(IUnitOfWork db, IMapper mapper, ILogger<UserService> logger, IUserRepository userRepository, IReviewRepository reviewRepository, IFileStorageService storage,   IEmailService emailService)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
        _userRepository = userRepository;
        _reviewRepository = reviewRepository;
        this.storage = storage;
        this.emailService = emailService;
        
    }

    public async Task Create(UserDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in UserService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_User.Add(mapper.Map<User>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding User in UserService");
            throw new ApplicationException("Error adding User", ex);
        }
    }

    public async Task Update(UserDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in UserService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in UserService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_User.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("User with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"User with ID {entity.Id} not found");
            }
            var (hash, salt) = PasswordHelper.HashPassword(entity.HashPassword);
            entity.HashPassword = Convert.ToBase64String(hash);
            mapper.Map(entity, exists);
            exists.Salt = Convert.ToBase64String(salt);
            
            await db.R_User.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating User with ID {Id} in UserService", entity.Id);
            throw new ApplicationException("Error updating User", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in UserService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_User.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("User with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"User with ID {id} not found");
            }

            await db.R_User.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting User with ID {Id} in UserService", id);
            throw new ApplicationException("Error deleting User", ex);
        }
    }

    public async Task<UserInfoDTO> GetUserInfo(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await _userRepository.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            return entity.ToInfoDto();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error getting Product", ex);
        }
    }

    public async Task<UserDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in UserService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_User.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("User with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"User with ID {id} not found");
            }

            return mapper.Map<UserDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting User with ID {Id} in UserService", id);
            throw new ApplicationException("Error getting User", ex);
        }
    }

    public async Task<IEnumerable<UserDTO>> GetAll()
    {
        try
        {
            var users = await db.R_User.GetAll();
            if (users == null)
            {
                logger.LogWarning("GetAll returned null in UserService");
                return Enumerable.Empty<UserDTO>();
            }

            return mapper.Map<IEnumerable<UserDTO>>(users);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in UserService");
            throw new ApplicationException("Error in GetAll function for User", ex);
        }
    }

    public async Task<bool> HasReview(int uid, int productId)
    {
        if (uid <= 0)
        {
            logger.LogWarning("Uid is 0 or lower in HasReview method of UserService");
            throw new ArgumentException("ID must be greater than 0", nameof(uid));
        }
        try
        {
            return await _reviewRepository.HasReview(uid, productId);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in HasReview function in UserService");
            throw new ApplicationException("Error in HasReview function for UserService", ex);
        }
    }

    public async Task<UserEntityDTO?> GetByEmail(string email)
    {
        var user = await _userRepository.GetByEmail(email);
        if (user == null) return null;

        return mapper.Map<UserEntityDTO>(user);
    }


    public Task<bool> EmailExists(string email)
    {
        return _userRepository.EmailExists(email);
    }

    public async Task UpdateInfo(UpdateUserInfoDTO entity, int uid)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in UserService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (uid <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in UserService", uid);
            throw new ArgumentException("ID must be greater than 0", nameof(uid));
        }

        try
        {
            var exists = await db.R_User.GetById(uid);
            if (exists == null)
            {
                logger.LogWarning("User with ID {Id} not found in Update function", uid);
                throw new KeyNotFoundException($"User with ID {uid} not found");
            }
            if (entity.Password != "" && entity.Password != null)
            {
                var (hash, salt) = PasswordHelper.HashPassword(entity.Password);
                exists.HashPassword = Convert.ToBase64String(hash);
                exists.Salt = Convert.ToBase64String(salt);
            }
            exists.Name = entity.FirstName + " " + entity.LastName;
            exists.Email = entity.Email;
            exists.Phone = entity.Phone;
            exists.DateOfBirth = entity.Dob;
            if (entity.ChangeAvatar)
            {
                string filename = $"{Guid.NewGuid()}_{entity.Image.FileName}";
                string url = await storage.UploadFileAsync(entity.Image, filename);
                exists.AvatarUrl = url;
                exists.FileName = filename;
            }
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating User with ID {Id} in UserService", uid);
            throw new ApplicationException("Error updating User", ex);
        }
    }
    public async Task<User> GetRawUserByUid(long uid)
    {
        return await _userRepository.GetById(uid);
    }

    public async Task UpdateAddress(UpdateAddressInfoDTO entity, long uid)
    {
        var user = await _userRepository.GetById(uid);
        if(user == null)
        {
            throw new Exception("User not found");
        }

        user.Name = entity.firstName + " " + entity.lastName;
        user.Phone = entity.phone;
        var existingAddress = user.Addresses.FirstOrDefault();
        
        if (existingAddress == null)
        {
            Address address = new Address();
            address.Country = entity.country;
            address.City = entity.city;
            address.PostalCode = entity.postalCode;
            address.Street = entity.street;
            address.HouseNumber = int.Parse(entity.houseNumber);
            address.IsDefault = true;
            user.Addresses.Add(address);
        }
        else
        {
            existingAddress.Country = entity.country;
            existingAddress.City = entity.city;
            existingAddress.PostalCode = entity.postalCode;
            existingAddress.Street = entity.street;
            existingAddress.HouseNumber = int.Parse(entity.houseNumber);
        }
        await db.SaveAsync();
    }


public async Task Register(RegisterDTO dto)
{
    // 1. Хешируем пароль
    var (hash, salt) = PasswordHelper.HashPassword(dto.Password);

 

    // 3. Создаём пользователя
    var user = new User(
        name: dto.FullName,               // имя и фамилия вместе
        email: dto.Email,
        hashPassword: Convert.ToBase64String(hash),
        country: "",                       // пустая строка по умолчанию
        phone: "",                         // пустая строка по умолчанию
        role: null,
        roleId: 1

    );

    // 4. Сохраняем Salt
    user.Salt = Convert.ToBase64String(salt);
    user.EmailConfirmed = false;

    // 5. Сохраняем в БД
    _userRepository.Add(user);        
    await _userRepository.SaveAsync();
    var token = GenerateToken();
    var confirmationToken = new EmailConfirmationToken
    {
        UserId = user.Id,
        TokenHash = HashToken(token),
        ExpiresAt = DateTime.UtcNow.AddHours(24)
    };

    await db.R_EmailConfirmationToken.Add(confirmationToken);

    var confirmationLink =
        $"https://master.dkpdvlnjjzw4.amplifyapp.com/email-confirmation?token={token}";

    await emailService.SendAsync(
        user.Email,
        "Confirm your email",
        $"Confirm your email: {confirmationLink}"
    );
}

public async Task ConfirmEmail(string token)
{
    var tokenHash = HashToken(token);

    var tokens = await db.R_EmailConfirmationToken.GetAll();

    var confirmationToken = tokens.FirstOrDefault(t =>
        t.TokenHash == tokenHash &&
        t.UsedAt == null &&
        t.ExpiresAt > DateTime.UtcNow
    );

    if (confirmationToken == null)
    {
        throw new ArgumentException("Invalid or expired token");
    }

    var user = await db.R_User.GetById(confirmationToken.UserId);

    if (user == null)
    {
        throw new KeyNotFoundException("User not found");
    }

    user.EmailConfirmed = true;
    user.EmailConfirmedAt = DateTime.UtcNow;
    confirmationToken.UsedAt = DateTime.UtcNow;

    await db.SaveAsync();
}


public async Task ForgotPassword(string email)
{
    var user = await _userRepository.GetByEmail(email.ToLower().Trim());

    if (user == null)
    {
        return;
    }

    var token = GenerateToken();

    var resetToken = new PasswordResetToken
    {
        UserId = user.Id,
        TokenHash = HashToken(token),
        ExpiresAt = DateTime.UtcNow.AddMinutes(30)
    };

    await db.R_PasswordResetToken.Add(resetToken);

    var resetLink = $"https://master.dkpdvlnjjzw4.amplifyapp.com/reset-password?token={token}";

    await emailService.SendAsync(
        user.Email,
        "Password reset",
        $"Reset your password: {resetLink}"
    );
}

public async Task ResetPassword(string token, string newPassword)
{
    var tokenHash = HashToken(token);

    var tokens = await db.R_PasswordResetToken.GetAll();

    var resetToken = tokens.FirstOrDefault(t =>
        t.TokenHash == tokenHash &&
        t.UsedAt == null &&
        t.ExpiresAt > DateTime.UtcNow
    );

    if (resetToken == null)
    {
        throw new ArgumentException("Invalid or expired token");
    }

    var user = await db.R_User.GetById(resetToken.UserId);

    if (user == null)
    {
        throw new KeyNotFoundException("User not found");
    }

    var (hash, salt) = PasswordHelper.HashPassword(newPassword);

    user.HashPassword = Convert.ToBase64String(hash);
    user.Salt = Convert.ToBase64String(salt);

    resetToken.UsedAt = DateTime.UtcNow;

    await db.SaveAsync();
}


private string GenerateToken()
{
    var bytes = RandomNumberGenerator.GetBytes(32);
    return Convert.ToBase64String(bytes)
        .Replace("+", "-")
        .Replace("/", "_")
        .Replace("=", "");
}

private string HashToken(string token)
{
    using var sha = SHA256.Create();
    var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(token));
    return Convert.ToHexString(bytes);
}





}