import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface IGenerarPedidoState {
    listCarta: IDropdownOption[];
    listGuarni: IDropdownOption[];
    listCategoria: IDropdownOption[];
    opcion: string;
    mostrarPedido: Boolean;
    loadingScreen: Boolean;
    showPanel: boolean;
}