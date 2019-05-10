import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode, IDetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { IListaMenuStates } from './IListaMenuStates';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ListaCarta } from './Classes/ListaCarta';
import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';

export default class ListaMenu extends React.Component< any, IListaMenuStates>{
    private _columns : IColumn[];
    // const MyIcon = () => <Icon iconName="CompassNW" className="ms-IconExample" />;
    _lstCarta: ListaCarta;
        
    constructor(props){
        super(props);
        this._lstCarta = new ListaCarta();
        this.state = {
            items: [], //RadioBtnOn, RadioBtnOff
            countCarta: 0,
            countGuarnicion: 0,
            countIngrediente: 0,
            groups: 
            [
                // { key: 'groupoCarta',       name: 'Carta',       startIndex: 0, count: this.state.countCarta },
                // { key: 'groupoGuarnicion',  name: 'Guarnicion',  startIndex: this.state.countCarta, count: this.state.countGuarnicion },
                // { key: 'groupoIngrediente', name: 'Ingrediente', startIndex: this.state.countGuarnicion, count: this.state.countIngrediente }
            ]
        };
        // PROBAR CON SETEAR ESTADO LUEGO DE CREAR ESTADO INICIAL, ES DECIR, PROBAR ACA.
        this._columns = [
             { key: 'titulo', name: 'Titulo', fieldName: 'titulo', minWidth: 100, maxWidth: 200 },
             { key: 'categoria', name: 'Categoría', fieldName: 'categoria', minWidth: 100, maxWidth: 200 },
             { key: 'disponibilidad', name: 'Disponibilidad', fieldName: 'disponibilidad', minWidth: 100, maxWidth: 200 },
             { key: 'precio', name: 'Precio', fieldName: 'precio', minWidth: 100, maxWidth: 200 }
        ];
    }

    public render(){
        return(
            <div>
                <DetailsList
                    items={this.state.items}
                    groups={this.state.groups}
                    columns={this._columns}
                    onRowDidMount ={this._onLoadTable}
                />
            </div>
        );
    }

    private _onLoadTable(){
        // this.setState({
        //     items: this._lstCarta.Items,
        //     countCarta: this._lstCarta.Items.length
        // })
    }
}
