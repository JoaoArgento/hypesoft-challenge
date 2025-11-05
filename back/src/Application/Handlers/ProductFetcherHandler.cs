using Application.DTOs;
using Application.Queries;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;

public class ProductFetcherHandler : IRequestHandler<FetchProductById, ProductDTO>
{
    private IStorableRepository<Product> storableRepository;
    private IMapper mapper;

    public ProductFetcherHandler(IStorableRepository<Product> storableRepository, IMapper mapper)
    {
        this.storableRepository = storableRepository;
        this.mapper = mapper;
    }
    public async Task<ProductDTO> Handle(FetchProductById request, CancellationToken cancellationToken)
    {
        Product product = await storableRepository.GetByIdAsync(request.Id);
        if (product == null) return null;
        return mapper.Map<ProductDTO>(product);
    }
}