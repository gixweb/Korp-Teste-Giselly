using Microsoft.AspNetCore.Mvc;
using Note_Service.Model;
using Note_Service.Service;


namespace Note_Service.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NoteService service;
    public  NotesController(NoteService service)
    {
        this.service = service;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<NotaFiscal>>> Get(){
        return Ok(await service.ListarTodos()); 
    }
    
    [HttpPost]
    public async Task<ActionResult<NotaFiscal>> post(NotaFiscal NotaFiscal){
        var novaNota = await service.CriarNota(NotaFiscal);
        if (novaNota == null)
        {
            return BadRequest("Não é permitido criar notas com saldo negativo.");
        }
        return CreatedAtAction(nameof(Get), new { id = novaNota.Id }, novaNota);
    }

    [HttpPost("{id}/imprimir")]
    public async Task<ActionResult<NotaFiscal>> ImprimirNota(int id)
    {
        var nota = await service.ImprimirNota(id);
        if (nota == null)
        {
            return NotFound("Nota não encontrada ou já impressa.");
        }
        return Ok(nota);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<NotaFiscal>> Put(int id, NotaFiscal notaFiscal)
    {
        var nota = await service.AtualizarNota(id, notaFiscal);
        if (nota == null) return NotFound();
        return Ok(nota);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var sucesso = await service.DeletarNota(id);
        if (!sucesso) return NotFound();
        return NoContent();
    }

}