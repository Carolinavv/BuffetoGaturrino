import { IColumn, buildColumns, SelectionMode, Toggle } from 'office-ui-fabric-react/lib/index';

export interface IGenerarPedidoProps {
  description: string;
}

export interface listaPedido {
  tipoDePlato: string;
  nombrePlato: string;
  guarnicion?: string;
  aderezos: string[];
  cubiertos: boolean;
  pan: boolean;
  usuario: string;
  ingredientes?: string[];
  precio: number;
}

export interface IGenerarPedidoState {
  items: listaPedido[];
  columns?: IColumn[];
  isDataLoaded?: boolean;

}