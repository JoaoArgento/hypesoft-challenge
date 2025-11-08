using MediatR;
using Application.DTOs;

namespace Application.Commands;


public record UpdateProductCommand(int ProductId, string Name, string Description, decimal Price, string Category, int AmountInStock) : IRequest<bool>;
