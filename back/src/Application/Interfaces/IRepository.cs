namespace Application.Interfaces;

public interface IStorableRepository<T>
{
    public Task AddAsync(T storable);
    public Task<T> GetByIdAsync(Guid id);
    public Task UpdateAsync(T storable);
    public Task DeleteByIdAsync(Guid id);

    public Task<IEnumerable<T>> GetAllAsync();

}