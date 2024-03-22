using Microsoft.EntityFrameworkCore;
using UserServiceApp.Data;
using UserServiceApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<UserServiceContext>(options =>
{
    options.UseSqlite(@"Data Source=user.db");
});

builder.Services.AddSingleton<IntegrationEventSenderService>();
builder.Services.AddHostedService<IntegrationEventSenderService>(provider => provider.GetService<IntegrationEventSenderService>());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<UserServiceContext>();
        dbContext.Database.EnsureCreated();
    }
}

app.UseAuthorization();

app.MapControllers();

app.Run();
