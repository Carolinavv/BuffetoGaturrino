import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import iListaMenuState from './IListaMenuStates';


export default class ListaMenu extends React.Component<{} , iListaMenuState>{
    constructor(props){
        super(props);

        this.state = {
            items: null,
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
    }
    render(){
        return(
            <div></div>
        );
    }
}