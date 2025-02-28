export interface Empresa {
    id?: string; // O Firestore gera um ID automaticamente
    nome: string;
    endereco: string;
    telefone: string;
    logoUrl?: string; // Caso tenha upload de logo
    uid: string; // ID do usuário dono da loja
    dataCriacao: Date;
}
