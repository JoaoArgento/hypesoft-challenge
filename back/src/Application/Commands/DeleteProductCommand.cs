using MediatR;

namespace Application.Commands
{
    public record DeleteProductCommand(Guid ProductId) : IRequest<bool>;
}