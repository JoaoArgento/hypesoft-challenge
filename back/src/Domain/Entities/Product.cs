namespace Domain.Entities;

public class Product 
{
    public enum ProductCategory
    {
        A,
        B,
        C
    }
    public string ProductName { get; private set; } = null;
    public string Description { get; private set; } = null;
    public decimal Price { get; private set; } 
    public int AmountInStock { get; private set; }
    public ProductCategory Category { get; private set; }
    public Guid? Id { get; private set; }

    public Product(Guid id, string name, string description, decimal price, int category, int amountInStock)
    {
        this.Id = id;
        this.ProductName = name;
        this.Description = description;
        this.Price = price;
        this.Category = (ProductCategory)category;
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
    public void UpdatePrice(decimal newPrice)
    {
        this.Price = newPrice;
    }
} 
