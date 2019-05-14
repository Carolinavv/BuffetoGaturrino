
export interface IListaConFiltroItem {
    key: string;
    text: string;
}
  
  export interface IListaPedidoDetalleState {
    items: IListaConFiltroItem[];
    selectionDetails: {};
  }