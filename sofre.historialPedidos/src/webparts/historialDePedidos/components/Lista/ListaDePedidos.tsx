import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IColumn, DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import IListaDePedidos from './IListaDePedidos';
import IListaDePedidosState from '../Lista/IListaDePedidosState';

export default class ListaDePedidos extends React.Component<{}, IListaDePedidosState> {
  private _allItems: IListaDePedidos[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._allItems = [];
    this._allItems.push({
      pedido: "hamburguesa comp.",
      usuario:"fernando",
      fecha: "01/01/2011",
      precio: "$75",
      estado: "completado"
    });
    this._allItems.push({
      pedido: "mini bife",
      usuario:"viviana",
      fecha: "02/09/2019",
      precio: "$190",
      estado: "cancelado"
    });
    this._allItems.push({
      pedido: "sand. milanesa",
      usuario:"florencia",
      fecha: "18/05/2019",
      precio: "$150",
      estado: "preparando"
    });
    this._allItems.push({
      pedido: "ensalada",
      usuario:"valeria",
      fecha: "21/04/2019",
      precio: "$110",
      estado: "completado"
    });
    this._allItems.push({
      pedido: "ravioles",
      usuario:"juan carlos",
      fecha: "21/04/2019",
      precio: "$75",
      estado: "completado"
    });
    this._allItems.push({
      pedido: "hamburguesa comp.",
      usuario:"gaston",
      fecha: "21/04/2019",
      precio: "$75",
      estado: "preparado"
    });
    this._allItems.push({
      pedido: "milanesa napolitana",
      usuario:"carla",
      fecha: "02/05/2019",
      precio: "$75",
      estado: "cancelado"
    });
    
    this._columns = [
      { key: 'pedido', name: 'Pedido', fieldName: 'pedido', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'usuario', name: 'Usuario', fieldName: 'usuario', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'fecha', name: 'Fecha', fieldName: 'fecha', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'precio', name: 'Precio', fieldName: 'precio', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'estado', name: 'Estado', fieldName: 'estado', minWidth: 100, maxWidth: 200, isResizable: true }
    ];

    this.state = {
      items: this._allItems,
    };
  }

  public render(): JSX.Element {
    const {items} = this.state;

    return (
      <Fabric>        
        <TextField
          label= "Buscar Usuario:"
          onChanged = {this._filtroDeUsuarios.bind(this)}
        />
        <TextField
          label= "Buscar Estado:"
          onChanged = {this._filtroDeEstado.bind(this)}
        />
        <TextField
          label= "Buscar Fecha:"
          onChanged = {this._filtroDeFecha.bind(this)}
        />
        <DetailsList
            compact={true}
            items={items}
            columns={this._columns}
            setKey="set"
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />        
      </Fabric>
    );
  }
  
  private _filtroDeUsuarios(text: string) {
    this.setState({
      items: text ? this._allItems.filter(i => i.usuario.toLowerCase().indexOf(text) > -1) : this._allItems
    });
  };

  private _filtroDeEstado(text: string) {
    this.setState({
      items: text ? this._allItems.filter(i => i.estado.toLowerCase().indexOf(text) > -1) : this._allItems
    });
  };

  private _filtroDeFecha(text: string) {
    this.setState({
      items: text ? this._allItems.filter(i => i.fecha.toLowerCase().indexOf(text) > -1) : this._allItems
    });
  };
}