namespace DefaultNamespace;

public class Role
{
    public long Id { get; set; }       // ID роли
    public string Name { get; set; }   // Название роли

    // Навигационное свойство "много пользователей"
    public List<User> Users { get; set; } = new();

    // Пустой конструктор
    public Role() { }

    // Конструктор с именем роли
    public Role(string name)
    {
        Name = name;
    }

    // Метод для добавления пользователя в роль
    public void AddUser(User user)
    {
        Users.Add(user);
        user.Role = this;   // связываем с этой ролью
        user.RoleId = Id;   // устанавливаем внешний ключ
    }
}