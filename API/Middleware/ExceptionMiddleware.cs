using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware>  _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
                IHostEnvironment env)
        {
            _next=next;
            _logger=logger;
            _env=env;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try{
                await _next(context);
            }
            catch(SystemException ex)
            {
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode = 500;
                
                var response=_env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode,"Internal Server Error");

                var options = new JsonSerializerOptions();
                options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                var json = JsonSerializer.Serialize(response,options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}