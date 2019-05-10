import {IGroup} from 'office-ui-fabric-react/lib/DetailsList';
import IListaMenuItem from './IListaMenuItem';

export interface IListaMenuStates{
    groups: IGroup[];
    items: IListaMenuItem[];
    countCarta: number;
    countGuarnicion: number;
    countIngrediente: number;
}