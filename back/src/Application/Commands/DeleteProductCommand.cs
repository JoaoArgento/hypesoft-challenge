using MediatR;

namespace Application.Commands
{
    public record DeleteProductCommand(string ProductId) : IRequest<bool>;
}