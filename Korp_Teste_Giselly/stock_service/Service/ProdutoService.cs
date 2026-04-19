using Microsoft.EntityFrameworkCore;
using Stock_Service.Data;
using Stock_Service.Model;
namespace Stock_Service.Service;


public class ProdutoService
{
    private readonly AppDbContext _context;

    public ProdutoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Produto>> ListarTodos()
    {
        return await _context.Produtos.ToListAsync();
    }

    public async Task<Produto?> CriarProduto(Produto produto)
    {
        
        if(produto.Saldo < 0)
        {
            return null;
        }
        _context.Produtos.Add(produto);
        
        await _context.SaveChangesAsync();
        return produto;
    }

    // Regra de negócio: Atualizar saldo (importante para o faturamento depois)
    public async Task<bool> AtualizarSaldo(int id, int quantidade)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return false;
        
        produto.Saldo += quantidade;
        await _context.SaveChangesAsync();
        return true;
    }
    
    public async Task<bool> AtualizarProduto(int id, Produto produtoAtualizado)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return false;

        // Atualiza os campos
        produto.Codigo = produtoAtualizado.Codigo;
        produto.Descricao = produtoAtualizado.Descricao;
        produto.Saldo = produtoAtualizado.Saldo;
        produto.Valor = produtoAtualizado.Valor;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeletarProdutos(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return false;
        
        _context.Produtos.Remove(produto);
        
        await _context.SaveChangesAsync();
        return true;
    }
}