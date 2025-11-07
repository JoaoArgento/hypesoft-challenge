using Application.DTOs;
using Domain.Entities;
using MediatR;

namespace Application.Commands
{
    public record AddProductCommand(string Name, string Description, decimal Price, string Category, int AmountInStock) : IRequest<ProductDTO>;
}