using AutoMapper;
namespace DefaultNamespace;

public class UserProfile : Profile
{
    public UserProfile()
    {
        // Автоматическое сопоставление всех одинаковых свойств, включая RoleId
        CreateMap<User, UserEntityDTO>();
    }
}