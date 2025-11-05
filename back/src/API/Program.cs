using MediatR;
using Serilog;
using FluentValidation;
using Infrastructure.Persistence;
using Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, logger) =>
{
    logger.ReadFrom.Configuration(context.Configuration).WriteTo.Console();
});

builder.Services.AddControllers();


builder.Services.AddInfra(builder.Configuration);
builder.Services.AddMediatR(typeof(Application.Commands.AddProductCommand).Assembly);



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.Run();


