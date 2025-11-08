using System.Runtime.CompilerServices;
using Application.DTOs;
using Application.Queries;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;

public class FetchAllProductsHandler : BaseRequestHandler<FetchAllProducts, IEnumerable<ProductDTO>, Product>
{
    public FetchAllProductsHandler(IStorableRepository<Product> storableRepository, IMapper mapper) : base(storableRepository, mapper){}

    public async override Task<IEnumerable<ProductDTO>> Handle(FetchAllProducts request, CancellationToken cancellationToken)
    {
        var products =  await storableRepository.GetAllAsync();
        return mapper.Map<IEnumerable<ProductDTO>>(products);
    }
}
