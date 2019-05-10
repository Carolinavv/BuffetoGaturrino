export  const CARTA = {
    Props: {
        Title: 'carta'
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Categoria: {
            Lookup: 'carCategoria',
            Fields: [{Title: 'Title'}]
        },
        Disponibilidad: 'carDisponibilidad',
        Precio: 'carPrecio'
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