const Carta = {
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

const Guarnicion = {
    Props: {
        Title: "guarnicion"
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Disponibilidad: 'guaDisponibilidad'
    }
};

const Ingredientes = {
    Props: {
        Title: 'ingredientes'
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Disponibilidad: 'ingDisponibilidad'
    }
};