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


using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load("./EnvironmentVariables.env");

builder.WebHost.UseUrls("http://0.0.0.0:5039");

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();


builder.Host.UseSerilog();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = "http://localhost:8080/realms/ProductManagement";
    options.RequireHttpsMetadata = false; 
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true, 
        ValidAudience = "user",
        ValidateIssuer = true
    };
});


builder.Services.AddControllers();


builder.Services.AddInfra(builder.Configuration);
builder.Services.AddMediatR(typeof(AddProductCommand).Assembly);

builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<ProductCreationValidator>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

var app = builder.Build();


app.UseCors("AllowAll");
app.UseRouting();
app.UseAuthentication();
app.MapControllers();


app.Run();


