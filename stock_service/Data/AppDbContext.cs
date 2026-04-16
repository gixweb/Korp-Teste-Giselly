namespace Stock_Service.Data;
using Microsoft.EntityFrameworkCore;
using Stock_Service.Model;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Isso cria a tabela 'Produtos' no banco de dados
    public DbSet<Produto> Produtos { get; set; }
}
