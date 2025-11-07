using Application.DTOs;
using MediatR;

namespace Application.Commands;

public record UpdateStockCommand(int Id, int Amount) : IRequest<ProductDTO>;