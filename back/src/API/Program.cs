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

DotNetEnv.Env.Load("./EnvironmentVariables.env");

builder.WebHost.UseUrls("http://0.0.0.0:5039");

builder.Host.UseSerilog((context, logger) =>
{
    logger.ReadFrom.Configuration(context.Configuration).WriteTo.Console();
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();


builder.Services.AddInfra(builder.Configuration);
builder.Services.AddMediatR(typeof(AddProductCommand).Assembly);

builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<ProductCreationValidator>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


app.UseRouting();
app.MapControllers();
app.UseCors("AllowAll");

app.Run();


