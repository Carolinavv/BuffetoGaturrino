import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface IGenerarPedidoState {
    listGuarni: IDropdownOption[];
    listCategoria: IDropdownOption[];
    opcion: string;
    mostrarPedido: Boolean;
    loadingScreen: Boolean;
}