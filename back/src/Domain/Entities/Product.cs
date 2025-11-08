namespace Domain.Entities;

public class Product
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public int AmountInStock { get; private set; }
    public string Category { get; private set; }
    public int Id { get; private set; }

    public Product(int id, string name, string description, decimal price, string category, int amountInStock)
    {
        this.Id = id;
        UpdateInfo(name, description, price, category, amountInStock);
    }
    public void UpdateStock(int amount)
    {
        this.AmountInStock = amount;
    }

    public void UpdateInfo(string name, string description, decimal price, string category, int amountInStock)
    {
        this.Name = name;
        this.Description = description;
        this.Price = price;
        this.Category = category;
        this.AmountInStock = amountInStock;
    }
} 
