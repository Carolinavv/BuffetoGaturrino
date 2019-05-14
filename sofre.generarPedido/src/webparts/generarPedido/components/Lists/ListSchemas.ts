export interface ListPedDetalle {
    tipoDePlato: string;
    nombrePlato: string;
    guarnicion?: string;
    aderezos: string[];
    cubiertos: boolean;
    cantidad: number;
    observaciones: string;
    subtotal: number;
    total: number;
    idpedido: number;
    idguarnicion: number;
    idcarta: number;
    pan: boolean;
    usuario: string;
    ingredientes?: string[];
    precio: number;
}

export interface ListCategoria {
    title: string;
    catGuarnicion: string[];
}

export interface ListCarta {
    ID: number;
    Titulo: string;
    Categoria: string;
    Guarnicion: string;
    Disponibilidad: boolean;
    Precio: number;
    Descuento: number;
}
