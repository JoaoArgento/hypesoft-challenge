using Application.DTOs;
using Application.Queries;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;

public class FetchAllProductsHandler : IRequestHandler<FetchAllProducts, IEnumerable<ProductDTO>>
{
    private readonly IStorableRepository<Product> storableRepository;
    private readonly IMapper mapper;

    public FetchAllProductsHandler(IStorableRepository<Product> storableRepository, IMapper mapper)
    {
        this.mapper = mapper;
        this.storableRepository = storableRepository;
    }

    public async Task<IEnumerable<ProductDTO>> Handle(FetchAllProducts request, CancellationToken cancellationToken)
    {
        var products =  await storableRepository.GetAllAsync();
        return mapper.Map<IEnumerable<ProductDTO>>(products);
    }
}
