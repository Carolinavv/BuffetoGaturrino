export const CARTA = {
    Props: {
        Title: 'carta'
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Categoria: {
            Lookup: 'carCategoria',
            Fields: [{ Title: 'Title' }]
        },
        Disponibilidad: 'carDisponibilidad',
        Precio: 'carPrecio',
        Descuento: 'carDescuento'
    }
};

export const GUARNICION = {
    Props: {
        Title: "guarnicion"
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Disponibilidad: 'guaDisponibilidad'
    }
};

export const INGREDIENTES = {
    Props: {
        Title: 'ingredientes'
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Disponibilidad: 'ingDisponibilidad'
    }
};

export const PEDIDODETALLE = {
    Props: {
        Title: 'pedidoDetalle'
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Guarnicion: {
            Lookup: 'pedGuarnicion',
            Fields: [
                {Title: 'Title'}
            ]
        },
        Ingredientes: {
            Lookup: 'pedIngredientes',
            Fields: [
                { Title: 'Title' }
            ]
        },
    }
};