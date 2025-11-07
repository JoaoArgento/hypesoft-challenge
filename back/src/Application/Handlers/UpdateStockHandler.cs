using MediatR;
using Application.Commands;
using Application.DTOs;
using Domain.Repositories;
using Domain.Entities;
using AutoMapper;

namespace Application.Handlers;

public class UpdateStockHandler : IRequestHandler<UpdateStockCommand, ProductDTO>
{
    private readonly IStorableRepository<Product> storableRepository;
    private IMapper mapper;

    public UpdateStockHandler(IStorableRepository<Product> storableRepository, IMapper mapper)
    {
        this.storableRepository = storableRepository;
        this.mapper = mapper;
    }

    public async Task<ProductDTO> Handle(UpdateStockCommand request, CancellationToken cancellationToken)
    {
        var product = await storableRepository.GetByIdAsync(request.Id);

        if (product is null)
        {
            throw new NullReferenceException("Product not found");
        }
        product.UpdateStock(request.Amount);
        await storableRepository.UpdateAsync(product);
        return mapper.Map<ProductDTO>(product);
    }
}
