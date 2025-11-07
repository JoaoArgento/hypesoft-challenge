namespace Application.DTOs;


public class ProductDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; private set; }
    public string Category { get; set; }
    public int AmountInStock { get; set; }

    public ProductDTO()
    {

    }
    
    public ProductDTO(int id, string name, string description, decimal price, string category, int amountInStock)
    {
        this.Name = name;
        this.Description = description;
        this.Price = price;
        this.Category = category;
        this.AmountInStock = amountInStock;
    }
}


 //public sealed record ProductDTO(int ? Id, string Name, string  Description, decimal  Price, string  Category, int  AmountInStock);