namespace Domain.Entities;

public class Category
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    
    public Category(int id, string name)
    {
        this.Id = id;
        this.Name = name;
    }
}