using MediatR;
using Application.DTOs;
namespace Application.Queries;
public record GetDashboardSummary() : IRequest<DashboardSummaryDTO>;
