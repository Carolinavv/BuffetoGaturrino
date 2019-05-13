import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode, IDetailsList, IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { IListaMenuStates } from './IListaMenuStates';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ListaCarta } from './Classes/ListaCarta';
import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';

export default class ListaMenu extends React.Component< any, IListaMenuStates>{
    private _columns : IColumn[];
    // const MyIcon = () => <Icon iconName="CompassNW" className="ms-IconExample" />;
    private _lstCarta: ListaCarta;
    private _groups: ListGroup[];
        
    constructor(props){
        super(props);
        this._lstCarta = new ListaCarta();
        this._lstCarta.updateItems();
        this._groups = [
            new ListGroup('groupoCarta', 'Carta'),
            new ListGroup('groupoGuarnicion', 'Guarnicion'),
            new ListGroup('groupoIngrediente', 'Ingrediente')
        ]
        this.state = {
            items: [], //RadioBtnOn, RadioBtnOff
            countCarta: 0,
            countGuarnicion: 0,
            countIngrediente: 0,
            groups: this._groups
        };
        this._columns = [
            { key: 'Titulo', name: 'Titulo', fieldName: 'Titulo', minWidth: 100, maxWidth: 200 },
            { key: 'Categoria', name: 'Categoría', fieldName: 'Categoria', minWidth: 100, maxWidth: 200 },
            { key: 'Disponibilidad', name: 'Disponibilidad', fieldName: 'Disponibilidad', minWidth: 100, maxWidth: 200 },
            { key: 'Precio', name: 'Precio', fieldName: 'Precio', minWidth: 100, maxWidth: 200 }
        ];
        this.updateLists();
    }

    public render(){
        return(
            <div>
                <DetailsList
                    items={this.state.items}
                    groups={this.state.groups}
                    columns={this._columns}
                />
            </div>
        );
    }

    public async updateLists(){
        await this._lstCarta.updateItems();

        this._groups[0].count  =  this._lstCarta.ItemsCount;

        this._groups[1].startIndex = this._groups[0].count;
        this._groups[2].startIndex = this._groups[0].count + this._groups[1].count;

        this.setState({
            groups: this._groups,
            items: this._lstCarta.Items
        })
    }
}

class ListGroup implements IGroup{
    key: string;
    name: string;
    startIndex: number;
    count:number;

    constructor( key:string, name:string, startIndex:number = 0, count:number = 0 ){
        this.key = key;
        this.name = name;
        this.startIndex = startIndex;
        this.count = count;
    }
}