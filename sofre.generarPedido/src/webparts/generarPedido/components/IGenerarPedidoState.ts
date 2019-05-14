import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface PedidoDetalle {
    nombrePlato: string;
    categoria: string;
    guarnicion?: string;
    ingredientes?: string[];
    cubiertos: boolean;
    pan: boolean;
    subtotal: number;
    aderezos: string[];
    usuario: string;
}
export interface IGenerarPedidoState {
    listCarta: IDropdownOption[];
    listGuarni: IDropdownOption[];
    listCategoria: IDropdownOption[];
    opcion: string;
    mostrarPedido: Boolean;
    loadingScreen: Boolean;
    showPanel: boolean;
    items: PedidoDetalle[];
    selectionDetails: string;
}