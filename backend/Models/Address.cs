namespace DefaultNamespace;

public class Address
{
    public long Id { get; set; }

    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string PostalCode { get; set; }

    public int HouseNumber { get; set; }

    // адрес по умолчанию
    public bool IsDefault { get; set; }

    // внешний ключ пользователя
    public long UserId { get; set; }

    // навигационное свойство
    public User User { get; set; }

    // пустой конструктор
    public Address() { }

    // конструктор
    public Address(
        string country,
        string city,
        string street,
        string postalCode,
        int houseNumber,
        bool isDefault,
        long userId)
    {
        Country = country;
        City = city;
        Street = street;
        PostalCode = postalCode;
        HouseNumber = houseNumber;
        IsDefault = isDefault;
        UserId = userId;
    }
}