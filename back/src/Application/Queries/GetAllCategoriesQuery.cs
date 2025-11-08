using Application.DTOs;
using MediatR;

namespace Application.Queries;

public record GetAllCategoriesQuery : IRequest<CategoryDTO>;