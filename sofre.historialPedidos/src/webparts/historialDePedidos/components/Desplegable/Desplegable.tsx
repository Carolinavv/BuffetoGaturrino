import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import {sp} from '@pnp/sp';
import { Pedido } from '../Struct/AuxSharpointList';
import {IDesplegableState} from '../Desplegable/IDesplegableState';
import {IListaDePedidos} from '../Lista/IListaDePedidos';
import {IListaDePedidosState} from '../Lista/IListaDePedidosState';

export class Desplegable extends React.Component<{}, IDesplegableState> {
    public state: IDesplegableState = {
        selectedItems: []
    };
    
    _cargarLista();

    public render() {
        const { selectedItems } = this.state;

        return (
            <Dropdown
                placeholder="Select options"
                label="Filtro de Estados"
                selectedKeys={selectedItems}
                onChanged={this._onChange.bind(this)}
                multiSelect
                options={[
                    { key: 'Pendiente', text: 'Pendiente' },
                    { key: 'Cancelado', text: 'Cancelado' },
                    { key: 'Listo', text: 'Listo'},
                    { key: 'Finalizado', text: 'Finalizado' },
                ]}
            />
        );
    }

    private _onChange(item: IDropdownOption) {
        const newSelectedItems = [...this.state.selectedItems];
        if (item.selected) {
            // add the option if it's checked
            newSelectedItems.push(item.key as string);
            
        } else {
            // remove the option if it's unchecked
            const currIndex = newSelectedItems.indexOf(item.key as string);
            if (currIndex > -1) {
                newSelectedItems.splice(currIndex, 1);
            }
        }
        this.setState({
            selectedItems: newSelectedItems
        });

        return{
            newSelectedItems
        };
    };

    private async _cargarLista() {
        sp.web
            .lists
            .getByTitle("pedidos")
            .items
            .select("Title", "pedTotal")
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
