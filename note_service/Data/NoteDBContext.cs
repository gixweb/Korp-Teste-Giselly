namespace Note_Service.Data;
using Microsoft.EntityFrameworkCore;
using Note_Service.Model;

public class NoteDBContext : DbContext
{
    public NoteDBContext(DbContextOptions<NoteDBContext> options) : base(options) { }
    
    public DbSet<NotaFiscal> Notas { get; set; }
    public DbSet<ItemNotaFiscal> Itens { get; set; }
}