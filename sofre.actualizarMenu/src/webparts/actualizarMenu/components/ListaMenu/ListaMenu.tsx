import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode, IDetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { IListaMenuStates } from './IListaMenuStates';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';
import '../../config/Listas';

export default class ListaMenu extends React.Component< any, IListaMenuStates>{
    private _columns : IColumn[];
    // const MyIcon = () => <Icon iconName="CompassNW" className="ms-IconExample" />;
    constructor(props){
        super(props);

        this.state = {
            items: [
                    { ID: 1, titulo: 'Ravioles', categoria: 'pasta', disponibilidad: true, precio: 200 }
            ], //RadioBtnOn, RadioBtnOff
            groups: 
            [
                { key: 'groupoCarta',       name: 'Carta',       startIndex: 0, count: 2 },
                { key: 'groupoGuarnicion',  name: 'Guarnicion',  startIndex: 3, count: 5 },
                { key: 'groupoIngrediente', name: 'Ingrediente', startIndex: 5, count: 7 }
            ],
            indexCarta: 0,
            indexGuarnicion: 0,
            indexIngrediente: 0
        };
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
                    onRenderRow={this._onLoadTable}
                />
            </div>
        );
    }

    private _onLoadTable(): JSX.Element{
        sp.web
            .lists
            .getByTitle("carta")
                .items
                .select("Id", "Title", "carCategoria/Title", "carDisponibilidad", "carPrecio")
                .expand("carCategoria")
                .orderBy("Modified", true)
                .get()
                .then((items: any[])=>{
                    console.log(items);
                });

        console.log(Listas.Carta);
        return; 
    }
}
