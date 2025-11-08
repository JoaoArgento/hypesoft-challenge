using System.Runtime.CompilerServices;
using Domain.Repositories;
using Domain.Entities;
using MongoDB.Driver;
using Infrastructure.Data;
using Application.DTOs;
using SharpCompress.Common;

namespace Infrastructure.Repositories;

public class Counter
{
    public string ? Id { get; set; }
    public int SequenceValue { get; set; }
}

public class ProductRepository : IStorableRepository<Product>
{
    private readonly MongoDBContext mongoDBContext;

    public ProductRepository(MongoDBContext mongoDBContext)
    {
        this.mongoDBContext = mongoDBContext;
    }

    public async Task AddAsync(Product dto)
    {
        if (dto == null)
        {
            throw new NullReferenceException("Storable is null");
        }

        await mongoDBContext.Products.InsertOneAsync(dto);
    }

    public async Task DeleteByIdAsync(int id)
    {
        if (id == -1)
        {
            throw new ArgumentNullException("id is not valid");
        }
        await mongoDBContext.Products.DeleteOneAsync(product => product.Id == id);

    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await mongoDBContext.Products.Find(_ => true).ToListAsync();
    }

    public async Task<Product> GetByIdAsync(int id)
    {
        if (id == -1)
        {
            throw new ArgumentNullException("id is not valid");
        }
        return await mongoDBContext.Products.Find(storable => storable.Id == id).FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(Product storableParam)
    {
        if (storableParam == null)
        {
            throw new NullReferenceException("Storable is null");
        }
        await mongoDBContext.Products.ReplaceOneAsync(storable => storable.Id == storableParam.Id, storableParam);
    }

    public async Task<int> GetNextIdAsync(string collectionName)
    {
        var counters = mongoDBContext.MongoDatabase.GetCollection<Counter>("counters");
        var filter = Builders<Counter>.Filter.Eq(c => c.Id, collectionName);
        var update = Builders<Counter>.Update.Inc(c => c.SequenceValue, 1);

        var options = new FindOneAndUpdateOptions<Counter>
        {
            ReturnDocument = ReturnDocument.After,
            IsUpsert = true,
        };

        var counter = await counters.FindOneAndUpdateAsync(filter, update, options);
        return counter.SequenceValue; 
    }
}