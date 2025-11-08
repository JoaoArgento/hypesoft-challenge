using Application.Commands;
using Application.DTOs;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Handlers;

public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, bool>
{
    private IStorableRepository<Product> productRepository;
    public UpdateProductHandler(IStorableRepository<Product> storableRepository) 
    {
        this.productRepository = storableRepository;
    }
    public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        Product product = await productRepository.GetByIdAsync(request.ProductId);

        if (product is null)
        {
            return false;
        }

        product.UpdateInfo(request.Name, request.Description, request.Price, request.Category, request.AmountInStock);

        await productRepository.UpdateAsync(product);

        return true;
    }
}