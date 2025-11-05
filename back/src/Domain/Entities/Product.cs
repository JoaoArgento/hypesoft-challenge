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
    public Guid? Id { get; private set; }

    public Product(Guid id, string name, string description, decimal price, int category, int amountInStock)
    {
        this.Id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = (ProductCategory)category;
        this.amountInStock = amountInStock;
    }

    public void RaiseStock(int amount)
    {
        amountInStock += amount;
    }

    public void RemoveStock(int amount)
    {
        amountInStock -= amount;

        if (amountInStock < 0)
        {
            amountInStock = 0;
        }
    }
    public void UpdatePrice(decimal newPrice)
    {
        this.price = newPrice;
    }
} 
