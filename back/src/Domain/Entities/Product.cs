namespace Domain.Entities;

public class Product 
{
    public enum ProductCategory
    {
        A,
        B,
        C
    }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; } 
    public int AmountInStock { get; private set; }
    public string Category { get; private set; }
    public int Id { get; private set; }

    public Product(int id, string name, string description, decimal price, string category, int amountInStock)
    {
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.Price = price;
        this.Category = category;
        this.AmountInStock = amountInStock;
    }

    public void RaiseStock(int amount)
    {
        AmountInStock += amount;
    }

    public void RemoveStock(int amount)
    {
        AmountInStock -= amount;

        if (AmountInStock < 0)
        {
            AmountInStock = 0;
        }
    }
} 
