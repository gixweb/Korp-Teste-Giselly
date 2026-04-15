namespace Note_Service.Model;

public class NotaFiscal
{
        public int Id { get; set; }
        public string NumeroNota { get; set; } = string.Empty;
        public int ProdutoId { get; set; } // O ID do produto que está lá no outro banco
        public int Quantidade { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime DataEmissao { get; set; } = DateTime.Now;
}