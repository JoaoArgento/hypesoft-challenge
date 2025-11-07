using MediatR;

namespace Application.Commands
{
    public record DeleteProductCommand(int ProductId) : IRequest<bool>;
}