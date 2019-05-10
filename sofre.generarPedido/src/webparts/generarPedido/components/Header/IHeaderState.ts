import { IDropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface IHeaderState {
    description: string;
    listCategoria: IDropdownOption[];
    mostrarPedido: Boolean;
    loadingScreen: Boolean;
    opcion: string;

  }
  