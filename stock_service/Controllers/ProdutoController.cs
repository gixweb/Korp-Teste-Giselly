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
        try{
            return Ok(await _service.ListarTodos());
        }
        catch(Exception ex){
            return StatusCode(500, $"Erro ao listar produtos: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Produto>> Post(Produto produto)
    {
        try{
            var novoProduto = await _service.CriarProduto(produto);
            if (novoProduto == null)
            {
                return BadRequest("Não é permitido cadastrar produtos com saldo negativo.");
            }
            return CreatedAtAction(nameof(Get), new { id = novoProduto.Id }, novoProduto);
        }
        catch(Exception ex){
            return StatusCode(500, $"Erro ao criar produto: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Produto produto)
    {
        try{
            var sucesso = await _service.AtualizarProduto(id, produto);
            if (!sucesso) return NotFound();
            return NoContent();
        }
        catch(Exception ex){
            return StatusCode(500, $"Erro ao atualizar produto: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {   
        try{
            var sucesso = await _service.DeletarProdutos(id);
            if (!sucesso) return NotFound();
            return NoContent();
        }
        catch(Exception ex){
            return StatusCode(500, $"Erro ao deletar produto: {ex.Message}");
        }
        
    }

    [HttpPatch("{id}/saldo")]
    public async Task<IActionResult> AtualizarSaldo(int id, [FromBody] int quantidade)
    {
        try{
            var sucesso = await _service.AtualizarSaldo(id, quantidade);
            if (!sucesso) return NotFound("Este produto não foi encontrado");
            return NoContent();
        }
        catch (Exception ex){
            return StatusCode(500, $"Erro ao atualizar saldo: {ex.Message}");
        }
    }

}