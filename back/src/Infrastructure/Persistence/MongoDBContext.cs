using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infrastructure.Persistence;

public class MongoDBContext<T> : DbContext
{
    private IMongoDatabase database;
    private string collectionName;
    public MongoDBContext(string collectionName, IConfiguration configuration)
    {

        if (string.IsNullOrEmpty(collectionName))
        {
            throw new ArgumentNullException(nameof(collectionName), "Is null or empty");
        }

        this.collectionName = collectionName;

        string? connection = configuration.GetConnectionString("MongoDb");
        string? databaseName = configuration["DatabaseSettings:DatabaseName"];

        if (string.IsNullOrEmpty(connection))
        {
            throw new ArgumentNullException(nameof(connection), "connection failed");
        }

        if (string.IsNullOrEmpty(databaseName))
        {
            throw new ArgumentNullException(nameof(databaseName), "Invalid name!");
        }

        MongoClient client = new MongoClient(connection);
        database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<T> Storables => database.GetCollection<T>(collectionName);
}