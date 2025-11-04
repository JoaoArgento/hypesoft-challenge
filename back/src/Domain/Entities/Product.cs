namespace Domain.Entities;

public class Product 
{
    public enum ProductCategory
    {
        A,
        B,
        C
    }
    private string name;
    private string description;
    private decimal price;
    private int amountInStock;
    private ProductCategory category;
    public string? Id { get; private set; }

    public Product(string name, string description, decimal price, ProductCategory category, int amountInStock)
    {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.amountInStock = amountInStock;
    }

    public void UpdatePrice(decimal newPrice)
    {
        this.price = newPrice;
    }
} 
