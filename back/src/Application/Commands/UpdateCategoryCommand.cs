using MediatR;

namespace Application.Commands;


public record UpdateCategoryCommand(int CategoryId, string Name) : IRequest<bool>;