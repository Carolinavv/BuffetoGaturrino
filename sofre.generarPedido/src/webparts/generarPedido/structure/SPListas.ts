export const CARTA = {
    Props: {
        Title: 'carta'
    },
    Fields: {
        Id: 'Id',
        Titulo: 'Title',
        Categoria: {
            Lookup: 'carCategoria',
            Fields: [{ Title: 'Title', Guarnicion: 'Guarnicion' }]
        },
        Disponibilidad: 'carDisponibilidad',
        Precio: 'carPrecio',
        Descuento: 'carDescuento',
        Total: 'carTotal'
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
        Id: 'ID',
        Titulo: 'Title',
        Guarnicion: {
            Lookup: 'peddtGuarnicion',
            Fields: [
                {Title: 'Title'}
            ]
        },
        Ingredientes: {
            Lookup: 'peddtIngredientes',
            Fields: [
                { Title: 'Title' }
            ]
        },
        Aderezos: 'peddtAderezos',
        Cubiertos: 'peddtCubiertos',
        Pan: 'peddtPan',
        Cantidad: 'peddtCantidad',
        Observaciones: 'peddtObservaciones',
        Usuario: 'peddtUsuario',
        Subtotal: 'peddtSubTotal',
        Total: 'peddtTotal',
        IDPedido: {
            Lookup: 'peddtIDPedido',
            Fields: [
                { Id: 'ID' }
            ]
        },
        IDGuarnicion: {
            Lookup: 'peddtIDGuarnicion',
            Fields: [
                { Id: 'ID' }
            ]
        },
        IDCarta: {
            Lookup: 'peddtIDCarta',
            Fields: [
                { Id: 'ID' }
            ]
        },
        TituloGuarnicion: 'peddtTituloGuarnicion',
        Categoria: 'peddtCategoria',
        Bonificaciones: 'peddtBonificaciones'
    }
};

export const PEDIDOS = {
    Id: 'ID',
    Titulo: 'Title',
    Observaciones: 'pedObservaciones',
    Estado: 'pedEstado',
    Ubicacion: 'pedUbicacion',
    Subtotal: 'pedSubTotal',
    HistorialPedido: 'pedHistorialEstado',
    Horario: 'pedHorario',
    Bonificaciones: 'pedBonificaciones',
    Total: 'pedTotal'
};