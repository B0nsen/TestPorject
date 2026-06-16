using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public class HomepageMapper
    {
        public static HomepageDTO toHomePageDTO(List<Product> products, List<Category> categories)
        {
            var randomProducts = products
            .OrderBy(x => Random.Shared.Next())
            .Take(2)
            .ToList();

            var randomCategories = categories
                .OrderBy(x => Random.Shared.Next())
                .Take(2)
                .ToList();

            var dtoItems = products.MapToDtoList().ToArray();
            Random.Shared.Shuffle(dtoItems);

            var prod1 = randomProducts.ElementAtOrDefault(0);
            var prod2 = randomProducts.ElementAtOrDefault(1);

            var cat1 = randomCategories.ElementAtOrDefault(0);
            var cat2 = randomCategories.ElementAtOrDefault(1);

            return new HomepageDTO
            {
                recommendedRow1 = new List<RecommendedRow1>
                {
                    new RecommendedRow1
                    {
                        Title = "Electronics & Gadgets",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[3]),
                            new CategoryDTO(categories[4]),
                            new CategoryDTO(categories[5]),
                            new CategoryDTO(categories[6]),
                        }
                    },
                    new RecommendedRow1
                    {
                        Title = "Home & Kitchen",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[11]),
                            new CategoryDTO(categories[8]),
                            new CategoryDTO(categories[9]),
                            new CategoryDTO(categories[10]),
                        }
                    },
                    new RecommendedRow1
                    {
                        Title = "Gaming & Entertainment",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[40]),
                            new CategoryDTO(categories[12]),
                            new CategoryDTO(categories[13]),
                            new CategoryDTO(categories[14]),
                        }
                    },
                    new RecommendedRow1
                    {
                        Title = "Fashion & Accessories",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[15]),
                            new CategoryDTO(categories[16]),
                            new CategoryDTO(categories[17]),
                            new CategoryDTO(categories[18]),
                        }
                    }
                },
                recommendedRow2 = new List<CategoryDTO>
                {
                    new CategoryDTO(categories[19]),
                            new CategoryDTO(categories[20]),
                            new CategoryDTO(categories[21]),
                            new CategoryDTO(categories[22]),
                },
                catalogSlider = dtoItems.Take(8).ToList(),
                recommendedRow3 = new List<RecommendedRow3>
                {
                    new RecommendedRow3
                    {
                        Id = prod1.Id,
                        Type = "product",
                        Title = "Featured Product",
                        Name = prod1.Name,
                        price = prod1.Price,
                        images = prod1.Images.Select(i => i.ImageUrl).ToList(),
                    },
                    new RecommendedRow3
                    {
                        Id = cat1.Id,
                        Type = "category",
                        Title = cat1.Name,
                        imageSrc = cat1.ImageUrl,
                    },
                    new RecommendedRow3
                    {
                        Id = prod2.Id,
                        Type = "product",
                        Title = "Top Deal",
                        Name = prod2.Name,
                        price = prod2.Price,
                        images = prod2.Images.Select(i => i.ImageUrl).ToList(),
                    },
                    new RecommendedRow3
                    {
                        Id = cat2.Id,
                        Type = "category",
                        Title = cat2.Name,
                        imageSrc = cat2.ImageUrl,
                    },
                },
            };
        }
    }
}
