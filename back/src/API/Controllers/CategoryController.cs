using Application.Commands;
using Application.Queries;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("categories")]
public class CategoryController : ControllerBase
{
    private IMediator mediator;

    public CategoryController(IMediator mediator)
    {
        this.mediator = mediator;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await mediator.Send(new GetAllCategoriesQuery());
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var result = await mediator.Send(new GetAllCategoriesQuery());
        return Ok(result);
    }


    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddCategoryCommand addCategoryCommand)
    {
        var result = await mediator.Send(addCategoryCommand);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var result = await mediator.Send(new DeleteStorableCommand<Category>(id));
        return Ok(result);
    }

    
}