import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode, IDetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { IListaMenuStates } from './IListaMenuStates';


export default class ListaMenu extends React.Component<{} , IListaMenuStates>{
    private _root = React.createRef<IDetailsList>();
    private _columns : IColumn[];
    constructor(props){
        super(props);

        this.state = {
            items: [
                    { ID: 1, nombre: 'Ravioles', categoria: 'pasta', disponibilidad: true, precio: 200 }
            ],
            groups: 
            [
                { key: 'groupoCarta',       name: 'Carta',       startIndex: 0, count: 0 },
                { key: 'groupoGuarnicion',  name: 'Guarnicion',  startIndex: 0, count: 0 },
                { key: 'groupoIngrediente', name: 'Ingrediente', startIndex: 0, count: 0 }
            ],
            indexCarta: 0,
            indexGuarnicion: 0,
            indexIngrediente: 0
        };
        this._columns = [
             { key: 'ID', name: 'ID', fieldName: 'ID', minWidth: 100, maxWidth: 200 },
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
                    componentRef={this._root}
                    items={this.state.items}
                    groups={this.state.groups}
                    columns={this._columns}
                />

            </div>
        );
    }

    public obtenerMenu(){}
}