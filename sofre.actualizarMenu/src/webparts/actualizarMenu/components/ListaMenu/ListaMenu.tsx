import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode, IDetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { IListaMenuStates } from './IListaMenuStates';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ListaCarta } from './Classes/ListaCarta';
import BarraComandos from './BarraComandos/BarraComando';
import { DropDown } from './BarraComandos/DropDown'

export default class ListaMenu extends React.Component< any, IListaMenuStates>{
    private _columns : IColumn[];
    private _lstCarta: ListaCarta;
    // const IconOn = () => <Icon iconName="RadioBtnOn" />;
    // const IconOff = () => <Icon iconName="RadioBtnOff" />;
        
    constructor(props){
        super(props);
        this._lstCarta = new ListaCarta();
        this._lstCarta.updateItems();
        this.state = {
            items: [], //RadioBtnOn, RadioBtnOff
        };
        this._columns = [
            { key: 'Titulo',         name: 'Titulo',         fieldName: 'Titulo',         minWidth: 100, maxWidth: 200 },
            { key: 'Categoria',      name: 'Categoría',      fieldName: 'Categoria',      minWidth: 100, maxWidth: 200 },
            { key: 'Disponibilidad', name: 'Disponibilidad', fieldName: 'Disponibilidad', minWidth: 100, maxWidth: 200 },
            { key: 'Precio',         name: 'Precio',         fieldName: 'Precio',         minWidth: 100, maxWidth: 200 }
        ];
        this.updateLists();
        this.addItem =this.addItem.bind(this);
    }

    public render(){
        return(
            <div>
                <BarraComandos onNewItem={this.addItem}/>
                <DropDown />
                <DetailsList
                    items={this.state.items}
                    columns={this._columns}
                />
            </div>
        );
    }

    public async updateLists(){
        await this._lstCarta.updateItems();


        this.setState({
            items: this._lstCarta.Items
        })
    }

    public addItem(){
        alert("HOLAS DESDE HOLA")
        // this._lstCarta.addItem("Pizza", "Pasta", true, 200);
        // this.updateLists()
    }

}
