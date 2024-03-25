using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using PostServiceApp.Data;
using PostServiceApp.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PostServiceContext>(options =>
{
    options.UseSqlite(@"Data Source=post.db");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<PostServiceContext>();
        dbContext.Database.EnsureCreated();
    }
}

app.UseAuthorization();

app.MapControllers();

ListenForIntegrationEvents(app);

app.Run();

static void ListenForIntegrationEvents(IHost host)
{
    var factory = new ConnectionFactory();
    var connection = factory.CreateConnection();
    var channel = connection.CreateModel();
    var consumer = new EventingBasicConsumer(channel);

    consumer.Received += (model, ea) =>
    {
        var body = ea.Body.ToArray();
        var message = Encoding.UTF8.GetString(body);
        Console.WriteLine(" [x] Received {0}", message);

        var data = JObject.Parse(message);
        var type = ea.RoutingKey;

        using var localScope = host.Services.CreateScope();
        var localDbContext = localScope.ServiceProvider.GetRequiredService<PostServiceContext>();

        if (type == "user.add")
        {
            if (localDbContext.User.Any(a => a.ID == data["id"].Value<int>()))
            {
                Console.WriteLine("Ignoring old/duplicate entity");
            }
            else
            {
                localDbContext.User.Add(new User()
                {
                    ID = data["id"].Value<int>(),
                    Name = data["name"].Value<string>(),
                    Version = data["version"].Value<int>(),
                });
                localDbContext.SaveChanges();
            }
        }
        else if (type == "user.update")
        {
            int newVersion = data["version"].Value<int>();
            var user = localDbContext.User.First(a => a.ID == data["id"].Value<int>());

            if (user.Version >= newVersion)
            {
                Console.WriteLine("Ignoring old/duplicate entity");
            }
            else
            {
                user.Name = data["newname"].Value<string>();
                user.Version = newVersion;
                localDbContext.SaveChanges();
            }
        }
        channel.BasicAck(ea.DeliveryTag, false);
    };
    channel.BasicConsume(queue: "user.postservice", autoAck: false, consumer: consumer);
}
