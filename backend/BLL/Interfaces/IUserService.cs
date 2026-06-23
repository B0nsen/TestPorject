using backend.BLL.DTO;
using backend.Models;
using DefaultNamespace;
namespace backend.BLL.Interfaces;

public interface IUserService
{
    Task Create(UserDTO entity);
    // Task Create(RegisterDTO entity);
    Task Register(RegisterDTO dto);
    Task Update(UserDTO entity);
    Task<User> GetRawUserByUid(long uid);
    Task Delete(int id);
    Task<UserDTO> Get(int id);
    Task<UserEntityDTO?> GetByEmail(string email);
    Task<IEnumerable<UserDTO>> GetAll();
    Task AddOrder(OrderDTO order, long uid);

    Task UpdateAddress(UpdateAddressInfoDTO address, long uid);

    Task<UserInfoDTO> GetUserInfo(int id);
    Task<bool> HasReview(int uid, int productId);

    Task<bool> EmailExists(string email);
    Task UpdateInfo(UpdateUserInfoDTO entity, int uid);
    Task ForgotPassword(string email);
    Task ResetPassword(string token, string newPassword);
    Task ConfirmEmail(string token);

}