namespace Note_Service.Model;

public enum StatusNotaFiscal
{
    Ativa = 1,
    Fechada = 2,
    Cancelada = 3,
    Impressa = 4
}

public class NotaFiscal
{
        public int Id { get; set; }
        public int NumeroNota { get; set; } = 0;
        public int ProdutoId { get; set; } 
        public int Quantidade { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime DataEmissao { get; set; } = DateTime.Now;
        public StatusNotaFiscal Status { get; set; } = StatusNotaFiscal.Ativa;
        public List<ItemNotaFiscal> Itens { get; set; } = new();
}

public class ItemNotaFiscal
        {
            public int Id { get; set; }
            public int NotaFiscalId { get; set; }
            public int ProdutoId { get; set; }
            public int Quantidade { get; set; }
            public decimal ValorTotal { get; set; }

        }