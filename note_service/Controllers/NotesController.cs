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
    
    
}