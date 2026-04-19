import { Produto } from "./produto-model";

export interface Nota {
    id?: number;
    numero?: number;
    quantidade?: number;
    dataEmissao?: Date;
    valorTotal?: number;
    itens?: any[];
    status?: string;
}