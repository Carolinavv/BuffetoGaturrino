import {IGroup} from 'office-ui-fabric-react/lib/DetailsList';
import IListaMenuItem from './IListaMenuItem';

export interface IListaMenuStates{
    groups: IGroup[];
    items: IListaMenuItem[];
    indexCarta: number;
    indexGuarnicion: number;
    indexIngrediente: number;
}