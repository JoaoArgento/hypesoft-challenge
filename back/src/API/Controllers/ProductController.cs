using Application.Commands;
using Application.Queries;
using Domain.Entities;
using Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Serilog;

namespace API.Controllers;

[ApiController]
[Route("products")]
public class ProductController : ControllerBase
{
    private IMediator mediator;
    public ProductController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await mediator.Send(new FetchAllProducts());
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var product = await mediator.Send(new FetchProductById(id));

        if (product is null)
        {
            return NotFound(new {message =  "Product not found"});
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] AddProductCommand addProductCommand)
    {
        var result = await mediator.Send(addProductCommand);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var result = await mediator.Send(new DeleteStorableCommand<Product>(id));
        return Ok(result);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsync(int id, [FromBody] UpdateProductCommand command)
    {
        var result = await mediator.Send(new UpdateProductCommand(id, command.CategoryId, command.Name, command.Description, command.Price, command.Category, command.AmountInStock));
        return Ok(result);
    }
    [HttpPatch("{id}/stock")]
    public async Task<IActionResult> UpdateStockAsync(int id, [FromBody] UpdateStockCommand usc)
    {
        var result = await mediator.Send(new UpdateStockCommand(id, usc.Amount));
        return Ok(result);
    }
}
