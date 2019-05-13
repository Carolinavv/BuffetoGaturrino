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

//  export class Pedidos {
//    private tipoDePlato: string;
//    private nombrePlato: string;
//    private guarnicion?: string;
//    private aderezos: string[];
//    private cubiertos: boolean;
//    private pan: boolean;
//    private usuario: string;
//    private ingredientes?: string[];
//    private precio: number;

//    constructor() {
    
//    }
//  }

export interface IGenerarPedidoState {
  items: listaPedido[];
  columns?: IColumn[];
  isDataLoaded?: boolean;

}