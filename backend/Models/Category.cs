namespace DefaultNamespace;

public class Category
{
    public long Id { get; set; }

    public string Name { get; set; }

    public string? FileName { get; set; }
    public string? ImageUrl { get; set; }

    // связь с продуктами через промежуточную таблицу
    public List<ProductCategory> ProductCategories { get; set; } = new();

    public Category() { }

    public Category(string name)
    {
        Name = name;
    }
}