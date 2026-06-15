using DefaultNamespace;

namespace backend.BLL.DTO;

public class CategoryDTO
{
    public long Id { get; set; }

    public string Name { get; set; }

    public string ImageUrl { get; set; }

    public CategoryDTO() { }

    public CategoryDTO(Category category)
    {
        Id = category.Id;
        Name = category.Name;
        ImageUrl = category.ImageUrl;
    }

}

public class CreateCategoryDTO
{
    public string Name { get; set; }
    public IFormFile file { get; set; } = null!;
}