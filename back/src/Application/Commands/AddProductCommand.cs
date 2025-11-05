using Application.DTOs;
using Domain.Entities;
using MediatR;

namespace Application.Commands
{
    public record AddProductCommand(Guid Id, string Name, string Description, decimal Price, int Category, int AmountInStock) : IRequest<ProductDTO>;
}