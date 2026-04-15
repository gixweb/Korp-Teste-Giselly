using Microsoft.EntityFrameworkCore;
using Note_Service.Data;
using Note_Service.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var serverVersion = new MySqlServerVersion(new Version(8, 0, 42));

builder.Services.AddScoped<NoteService>();
builder.Services.AddControllers();
builder.Services.AddAuthorization();

builder.Services.AddDbContext<NoteDBContext>(options =>
    options.UseMySql(connectionString, serverVersion));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<NoteDBContext>();
        // O comando abaixo cria o banco e as tabelas automaticamente 
        // se eles ainda não existirem, ignorando a necessidade de migrations no terminal.
        context.Database.EnsureCreated();
        Console.WriteLine("Banco de Notas verificado/criado com sucesso!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erro ao criar o banco: {ex.Message}");
    }
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}