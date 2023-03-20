using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Persistence;


var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();


if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors("Cors Policy");
app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    //.SetIsOriginAllowed(origin => true) // allow any origin
                    .WithOrigins("https://localhost:3000")); // Allow only this origin can also have multiple origins separated with comma
                    //.AllowCredentials()); // allow credentials

app.UseAuthentication();

app.MapControllers();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;


await app.RunAsync();
/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Middleware;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            var app = CreateHostBuilder(args).Build();

            using var scope = app.Services.CreateScope();

            var services = scope.ServiceProvider;
            try{
                var context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context);
            }
            catch(Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during migration.");

            }
            await app.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}*/