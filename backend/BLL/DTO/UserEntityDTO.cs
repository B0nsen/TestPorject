namespace DefaultNamespace;
public class UserEntityDTO
{
        public long Id { get; set; }
        public string Email { get; set; }
        public string HashPassword { get; set; }
        public string Salt { get; set; }
        public long RoleId { get; set; } 
        public bool EmailConfirmed { get; set; }
}