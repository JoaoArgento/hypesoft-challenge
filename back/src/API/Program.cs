using MediatR;
using Serilog;
using Infrastructure.Data;
using Infrastructure.Repositories;
using API.Extensions;
using Application.Mappings;
using Microsoft.AspNetCore.Components.Forms.Mapping;
using FluentValidation;
using Application.Validators;
using Application.Commands;
using Application.Queries;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Host.UseSerilog((context, logger) =>
{
    logger.ReadFrom.Configuration(context.Configuration).WriteTo.Console();
});

builder.Services.AddControllers();


builder.Services.AddInfra(builder.Configuration);
builder.Services.AddMediatR(typeof(Application.Commands.AddProductCommand).Assembly);
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<ProductCreationValidator>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// app.MapPost("/products", async (AddProductCommand amd, IMediator mediator) =>
// {
//     var result = await mediator.Send(amd);
//     return Results.Created($"/products/{result.Id}", result);
// });

// app.MapGet("/products/{id:guid}", async (Guid id, IMediator mediator) =>
// {
//     var result = await mediator.Send(new FetchProductById(id));

//     if (result is null)
//     {
//         return Results.NotFound();
//     }
//     return Results.Ok(result);
// });

app.UseRouting();
app.MapControllers();


app.Run();


