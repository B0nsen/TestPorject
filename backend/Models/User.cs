namespace DefaultNamespace;

public class User
{
    // Основные свойства
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string HashPassword { get; set; }
    public string Salt { get; set; }
    public string? Country { get; set; }
    public string? Phone { get; set; }

    public string? AvatarUrl { get; set; }
    public string? FileName { get; set; }

    public DateTime DateOfBirth { get; set; }
    public bool EmailConfirmed { get; set; } = false;
    public DateTime? EmailConfirmedAt { get; set; }

    // Роль
    public Role Role { get; set; } = null;
    public long RoleId { get; set; } = 1;

    // Навигационные свойства
    public List<Address> Addresses { get; set; } = new();
    public List<CreditCard> Payments { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
    public List<CartItem> Cart { get; set; } = new();
    public List<Review> Reviews { get; set; } = new();
    
    public User() { }

    // Конструктор с основными полями
    public User(string name, string email, string hashPassword, string country, string phone, Role role, long roleId = 1)
    {
        Name = name;
        Email = email;
        HashPassword = hashPassword;
        Country = country;
        Phone = phone;
        Role = role;
        RoleId = role?.Id ?? RoleId; 
    }

    // Метод для добавления адреса
    public void AddAddress(Address address)
    {
        Addresses.Add(address);
    }

    // Метод для добавления платежа
    public void AddPayment(CreditCard payment)
    {
        Payments.Add(payment);
    }

    // Метод для добавления заказа
    public void AddOrder(Order order)
    {
        Orders.Add(order);
    }

    // Метод для добавления элемента в корзину
    public void AddToCart(CartItem item)
    {
        Cart.Add(item);
    }
}