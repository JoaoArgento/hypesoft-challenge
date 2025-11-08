using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data;
using MongoDB.Driver;

namespace Infrastructure.Repositories;

public class CategoryRepository : IStorableRepository<Category>
{
    private MongoDBContext mongoDBContext;
    private IMapper mapper;
    public CategoryRepository(MongoDBContext mongoDBContext, IMapper mapper)
    {
        this.mongoDBContext = mongoDBContext;
        this.mapper = mapper;
    }

    public async Task AddAsync(Category storable)
    {
        if (storable == null)
        {
            throw new NullReferenceException("category is null");
        }
        await mongoDBContext.Categories.InsertOneAsync(storable);
    }

    public async Task DeleteByIdAsync(int id)
    {
         if (id == -1)
        {
            throw new ArgumentNullException("id is not valid");
        }
        await mongoDBContext.Categories.DeleteOneAsync(category => category.Id == id);
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await mongoDBContext.Categories.Find(_ => true).ToListAsync();
    }

    public async Task<Category> GetByIdAsync(int id)
    {
         if (id == -1)
        {
            throw new ArgumentNullException("id is not valid");
        }
        return await mongoDBContext.Categories.Find(storable => storable.Id == id).FirstOrDefaultAsync();
    }
    public async Task UpdateAsync(Category storableParam)
    {
         if (storableParam == null)
        {
            throw new NullReferenceException("Storable is null");
        }
        await mongoDBContext.Categories.ReplaceOneAsync(storable => storable.Id == storableParam.Id, storableParam);
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