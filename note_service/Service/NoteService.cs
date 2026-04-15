using Microsoft.EntityFrameworkCore;
using Note_Service.Model;
using Note_Service.Data;
namespace Note_Service.Service;


public class NoteService
{
    private readonly NoteDBContext _context;
    public NoteService(NoteDBContext context)
    {
        _context = context;
    }
    
    public async Task<List<NotaFiscal>> ListarTodos()
    {
        return await _context.Notas.ToListAsync();
    }
}