namespace DefaultNamespace;

public class Wishlist
{
    public long Id { get; set; }

    // внешний ключ пользователя
    public long UserId { get; set; }

    // имя списка (например: "Birthday", "Electronics")
    public string Name { get; set; }

    // навигационное свойство
    public User User { get; set; }

    // элементы списка
    public List<WishlistItem> Items { get; set; } = new();

    // пустой конструктор (нужен EF Core)
    public Wishlist() { }

    // конструктор
    public Wishlist(long userId, string name)
    {
        UserId = userId;
        Name = name;
    }

    // метод добавления товара
    public void AddItem(WishlistItem item)
    {
        Items.Add(item);
    }

    // метод удаления товара
    public void RemoveItem(WishlistItem item)
    {
        Items.Remove(item);
    }
}