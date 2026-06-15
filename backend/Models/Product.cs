using Amazon.Runtime.Telemetry;
using backend.Models;

namespace DefaultNamespace;
#nullable enable 
public class Product
{
    // Основные свойства
    public long Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Brand { get; set; }
    public string Condition { get; set; }
    public int? Sale { get; set; }
    public string Description { get; set; }
    public bool Available { get; set; }
    public string Warranty { get; set; }
    public int MaxQuantity { get; set; }

    public string ManufacturerBanner { get; set; }

    public ProductMetadata Metadata { get; set; } = new();

    // Навигационные свойства
    public List<ProductCategory> ProductCategories { get; set; } = new();
    public List<ProductImage> Images { get; set; } = new();
    public List<Review> Reviews { get; set; } = new();

    // Пустой конструктор (для EF Core)
    public Product() { }

    // Конструктор с основными полями
    public Product(string name, string brand, string color, double price, double weight, int sale, bool available)
    {
        Name = name;
        Price = price;
        Sale = sale;
        Available = available;
    }

    // Методы для работы с категориями и изображениями
    public void AddCategory(ProductCategory category)
    {
        ProductCategories.Add(category);
    }

    public void AddImage(ProductImage image)
    {
        Images.Add(image);
    }
}