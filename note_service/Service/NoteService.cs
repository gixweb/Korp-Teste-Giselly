using Microsoft.EntityFrameworkCore;
using Note_Service.Model;
using Note_Service.Data;
using System.Text;
namespace Note_Service.Service;


public class NoteService
{
    private readonly NoteDBContext _context;
    private readonly HttpClient _httpClient;
    public NoteService(NoteDBContext context, HttpClient httpClient)
    {
        _context = context;
        _httpClient = httpClient;
    }
    
    public async Task<List<NotaFiscal>> ListarTodos()
    {
        return await _context.Notas.ToListAsync();
    }
    
    public async Task<NotaFiscal> CriarNota(NotaFiscal nota){
        
        var NumeroMaximo = await _context.Notas.MaxAsync(n => (int?) n.NumeroNota) ?? 0;
        nota.NumeroNota = NumeroMaximo + 1;

        _context.Notas.Add(nota);
        await _context.SaveChangesAsync();
        return nota;
    }
    
    public async Task<NotaFiscal> BuscarNota(int id){
        var nota = await _context.FindAsync(nota.Id);
        if(nota == null){
            return null;
        }
        return nota;
    }

    public async Task<NotaFiscal> ImprimirNota(int id){
        var nota = await _context.Notas.Include(n => n.Itens).FirstOrDefaultAsync(n => n.Id == id);
        
        if(nota == null){ return null; }

        if(nota.Status == StatusNotaFiscal.Ativa){
            nota.Status = StatusNotaFiscal.Impressa;
            await _context.SaveChangesAsync();

            foreach (var item in nota.Itens)
            {
                await _httpClient.PatchAsync($"api/produto/{item.ProdutoId}/saldo", 
                    new StringContent($"{-item.Quantidade}", Encoding.UTF8, "application/json"));
            }

            return nota;
        }
        else{ return null; }
    }

    public async Task<NotaFiscal> AtualizarNota(int id, NotaFiscal notaAtualizada){
        var nota = await _context.Notas.FindAsync(id);
        if(nota == null){ return null; }
        nota.NumeroNota = notaAtualizada.NumeroNota;
        nota.ProdutoId = notaAtualizada.ProdutoId;
        nota.Quantidade = notaAtualizada.Quantidade;
        nota.ValorTotal = notaAtualizada.ValorTotal;
        nota.Status = notaAtualizada.Status;
        await _context.SaveChangesAsync();
        return nota;
    }

    public async Task<bool> DeletarNota(int id){
        var nota = await _context.Notas.FindAsync(id);
        if(nota == null){ return false; }
        _context.Notas.Remove(nota);
        await _context.SaveChangesAsync();
        return true;
    }
}