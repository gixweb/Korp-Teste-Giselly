namespace Stock_Service.Model;

public class Produto
{
    public int Id { get; set; }
    
    public string codigo { get; set; } = string.Empty; // [cite: 21]
    public string descricao { get; set; } = string.Empty; // [cite: 22]
    public int saldo { get; set; } // [cite: 23]
}
