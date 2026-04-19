import { Produto } from "./produto-model";

export interface Nota {
    id?: number;
    numeroNota?: number;
    quantidade?: number;
    dataEmissao?: Date;
    valorTotal?: number;
    itens?: any[];
    status?: number; // Backend manda 1 para Ativa, 4 para Impressa
}