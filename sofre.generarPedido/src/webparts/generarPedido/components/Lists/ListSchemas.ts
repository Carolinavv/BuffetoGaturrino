export interface ListPedDetalle {
    tipoDePlato: string;
    nombrePlato: string;
    guarnicion?: string;
    aderezos: string[];
    cubiertos: boolean;
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
    Disponibilidad: boolean;
    Precio: number;
    Descuento: number
}
