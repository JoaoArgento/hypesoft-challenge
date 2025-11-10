namespace API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Serilog;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly HttpClient httpClient;
    private readonly IConfiguration config;

    public AuthController(IConfiguration config)
    {
        httpClient = new HttpClient();
        this.config = config;
    }
    [HttpGet()]
    public async Task<IActionResult> Get()
    {
        return Ok("alo");
    }

    [HttpPost("callback")]
    public async Task<IActionResult> Callback([FromBody] AuthCodeRequest request)
    {
        try
        {
            var values = new Dictionary<string, string>
            {
                { "grant_type", "authorization_code" },
                { "code", request.Code },
                { "redirect_uri", "http://localhost:3000" },
                { "client_id", Environment.GetEnvironmentVariable("KEYCLOAK_CLIENT_ID")},
                { "client_secret", Environment.GetEnvironmentVariable("KEYCLOAK_CLIENT_SECRET")}
            };

            var response = await httpClient.PostAsync(
            "http://host.docker.internal:8080/realms/ProductManagement/protocol/openid-connect/token",
                new FormUrlEncodedContent(values)
            );
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
    {
    var values = new Dictionary<string, string>
    {
       { "client_id", Environment.GetEnvironmentVariable("KEYCLOAK_CLIENT_ID")},
        { "client_secret", Environment.GetEnvironmentVariable("KEYCLOAK_CLIENT_SECRET") }
    };

    var response = await httpClient.PostAsync(
        "http://keycloak:8080/realms/ProductManagement/protocol/openid-connect/logout",
        new FormUrlEncodedContent(values)
    );

    return StatusCode((int)response.StatusCode);
}

public class LogoutRequest
{ 
    public string RefreshToken { get; set; } }
}

public class AuthCodeRequest
{
    public string Code { get; set; }
}
