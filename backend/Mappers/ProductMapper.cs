using backend.BLL.DTO;
using backend.Mappers;
namespace DefaultNamespace;

public static class ProductMapper
{
    public static ProductGetDTO ToPageDto(this Product product)
    {
        ProductGetDTO res = new ProductGetDTO {
            Id = product.Id,
            Title = product.Name,
            StoreLink = "/store",

            Images = MapImages(product),

            Rating = MapRating(product),
            RatingCount = product.Reviews.Count,

            Price = MapPrice(product),

            MaxQuantity = product.MaxQuantity,
            InStock = product.Available,
            Warranty = product.Warranty,
            manufacturerBanner = product.ManufacturerBanner,

            Description = product.Description,
            AboutItems = product.Metadata?.AboutItems ?? new List<string>(),
            ProductInfo = product.Metadata.Attribute.Select(kvp => new AttributesDTO
            {
                Label = kvp.Key,
                Value = kvp.Value
            }).ToList(),

            ActionsSection = MapActions(),
        };
        res.ProductInfo.Insert(0, new AttributesDTO
        {
            Label = "Brand",
            Value = product.Brand
        });
        return res;
    }

    // --- Разбивка на методы ---

    public static ImagesDTO MapImages(Product product)
    {
        Console.WriteLine(product.Images.Where(i => i.IsMain).Select(i => i.ImageUrl).FirstOrDefault());
        return new ImagesDTO
        {
            Main = product.Images.Where(i => i.IsMain).Select(i => i.ImageUrl).FirstOrDefault(),
            Thumbnails = product.Images.Where(i => !i.IsMain).Select(i => i.ImageUrl).ToList()
        };
    }

    public static PriceDTO MapPrice(Product product)
    {
        var discount = product.Sale ?? 0;

        return new PriceDTO
        {
            ListPrice = (decimal)product.Price,
            DiscountPercent = discount,
            CurrentPrice = (decimal)(product.Price * (1 - discount / 100.0))
        };
    }

    public static double MapRating(Product product)
    {
        if (product.Reviews == null || product.Reviews.Count == 0)
            return 0;

        return Math.Round(product.Reviews.Average(r => r.Rating), 1); // зависит от Review
    }

    public static ActionsDTO MapActions()
    {
        return new ActionsDTO
        {
            DeliveryText = "FREE delivery",
            DeliveryDate = "Monday, February",
            ShippingLocation = "Unknown",
            Shipper = "Amazon",
            Returns = "FREE 30-day refund",
            Payment = "Secure transaction"
        };
    }

    public static IEnumerable<FilterCellDTO> MapToCellList (this IEnumerable<Product> products)
    {
        FilterCellDTO deparment = new FilterCellDTO
        {
            key = "department",
            title = "Department",
            type = "single_select",
            options = products
            .SelectMany(p => p.ProductCategories)
            .Select(pc => pc.Category.Name)
            .Distinct()
            .ToList()
        };
        FilterCellDTO rating = new FilterCellDTO
        {
            key = "rating",
            title = "Customer Reviews",
            type = "rating"
        };
        FilterCellDTO brand = new FilterCellDTO
        {
            key = "brand",
            title = "Featured Brands",
            type = "multiselect",
            options = products.Select(p => p.Brand).Distinct().ToList()
        };
        FilterCellDTO price = new FilterCellDTO
        {
            key = "price",
            title = "Price",
            type = "range",
            min = products.Min(p => p.Price),
            max = products.Max(p => p.Price)
        };
        FilterCellDTO condition = new FilterCellDTO
        {
            key = "condition",
            title = "Condition",
            type = "multiselect",
            options = ["New", "Renewed", "Used"]
        };

        return [deparment, rating, brand, price, condition];
    }
}