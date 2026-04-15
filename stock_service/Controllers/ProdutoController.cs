using Microsoft.AspNetCore.Mvc;
using Stock_Service.Model;
using Stock_Service.Service;

namespace Stock_Service;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly ProdutoService _service;
    
    public ProdutoController(ProdutoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<Produto>>> Get()
    {
        return Ok(await _service.ListarTodos());
}

    [HttpPost]
    public async Task<ActionResult<Produto>> Post(Produto produto)
    {
        var novoProduto = await _service.CriarProduto(produto);
        if (novoProduto == null)
        {
            // Se o service barrou a criação, o controller avisa que a requisição foi ruim
            return BadRequest("Não é permitido cadastrar produtos com saldo negativo.");
        }
        return CreatedAtAction(nameof(Get), new { id = novoProduto.Id }, novoProduto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Produto produto)
    {
        var sucesso = await _service.AtualizarProduto(id, produto);
        if (!sucesso) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var sucesso = await _service.DeletarProdutos(id);
        if (!sucesso) return NotFound();
        return NoContent();
    }
}