interface IListas {
    Carta: IListaCarta,
    Guarnicion: IListaGuarnicion,
    Ingredientes: IListaIngredientes 
}

interface IListaCarta {
    Props: {
        Title: string
    },
    Fields: {
        Id: number,
        Titulo: string,
        Categoria: IListaLookup,
        Disponibilidad: boolean,
        Precio: number
    }
}

interface IListaGuarnicion {
    Props: {
        Title: string
    },
    Fields: {
        Id: number,
        Titulo: string,
        Disponibilidad: boolean
    }
}

interface IListaIngredientes {
    Props: {
        Title: string
    },
    Fields: {
        Id: number,
        Titulo: string,
        Disponibilidad: boolean
    }
}

interface IListaLookup {
    Lookup: string,
    Fields: {}[]
}