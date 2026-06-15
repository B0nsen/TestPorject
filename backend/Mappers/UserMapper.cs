using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public static class UserMapper
    {
        public static UserInfoDTO ToInfoDto(this User user)
        {
            string[] parts = user.Name.Split(' ');
            var address = user.Addresses.FirstOrDefault();
            if (address == null)
            {
                return new UserInfoDTO
                {
                    FirstName = parts[0],
                    LastName = parts[1],
                    Avatar = user.AvatarUrl != null ? user.AvatarUrl : "",
                    Email = user.Email,
                    Phone = user.Phone,
                    Password = "",
                    Country = user.Country,
                    Dob = user.DateOfBirth.ToString() != null ? user.DateOfBirth.ToString() : "",
                    Address = new AddressInfoDTO
                    {
                        Street = "",
                        City = "",
                        PostalCode = "",
                        State = ""
                    }
                };
            }
            return new UserInfoDTO
            {
                FirstName = parts[0],
                LastName = parts[1],
                Avatar = user.AvatarUrl != null ? user.AvatarUrl : "",
                Email = user.Email,
                Phone = user.Phone,
                Password = "",
                Country = user.Country,
                Dob = user.DateOfBirth.ToString() != null ? user.DateOfBirth.ToString() : "",
                Address = new AddressInfoDTO
                {
                    Street = address.Street,
                    City = address.City,
                    PostalCode = address.PostalCode,
                    HouseNumber = address.HouseNumber,
                    State = ""
                }
            };
        }
        public static IEnumerable<UserInfoDTO> MapToDtoList(this IEnumerable<User> user)
        {
            return user.Select(u => u.ToInfoDto());
        }
    }
}
