import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IColumn, DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {IListaDePedidos} from './IListaDePedidos';
import {IListaDePedidosState} from '../Lista/IListaDePedidosState';
import '@pnp/polyfill-ie11';
import {sp} from '@pnp/sp';
import {Pedido} from '../Struct/AuxSharpointList';

export default class ListaDePedidos extends React.Component<{}, IListaDePedidosState> {
  private _allItems: IListaDePedidos[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);
    
    this._cargarLista();
    this._allItems = [];

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
      <div>
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
      </div>
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
  private async _cargarLista() {
      sp.web
        .lists
          .getByTitle("pedidos")
            .items
              .select("Title","pedTotal")
              .get()
              .then((items: any[]) => {    
                console.log(items);
                this._allItems = items.map((val) => {
                  return {
                    pedido: val.Title,
                    usuario: 'string',
                    fecha: 'string',
                    precio: '$' + val.pedTotal,
                    estado: val.pedEstado
                  }
                })
                this.setState({
                  items: this._allItems
                });
              });
  };
};