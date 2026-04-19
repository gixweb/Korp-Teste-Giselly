namespace Stock_Service.Model;

public class Produto
{
    public int Id { get; set; }
    
    public string Codigo { get; set; } = string.Empty; // [cite: 21]
    public string Descricao { get; set; } = string.Empty; // [cite: 22]
    public decimal Valor { get; set; } = 0;
    public int Saldo { get; set; } // [cite: 23]
}
