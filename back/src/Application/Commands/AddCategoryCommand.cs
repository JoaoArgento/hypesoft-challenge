using Application.DTOs;
using MediatR;

namespace Application.Commands;


public record AddCategoryCommand(string Name) : IRequest<CategoryDTO>;
