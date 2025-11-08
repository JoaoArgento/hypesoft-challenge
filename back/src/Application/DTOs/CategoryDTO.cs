namespace Application.DTOs;

public class CategoryDTO
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    
    public CategoryDTO(int id, string name)
    {
        this.Id = id;
        this.Name = name;
    }
}