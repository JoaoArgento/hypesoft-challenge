using Domain.Entities;
using Domain.Repositories;

namespace Application.Handlers;

public class DeleteProductHandler : DeleteStorableHandler<Product>
{
    public DeleteProductHandler(IStorableRepository<Product> storableRepository) : base(storableRepository)
    {
    }
}