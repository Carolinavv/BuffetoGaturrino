import {IGroup} from 'office-ui-fabric-react/lib/DetailsList'
import IListaMenuItem from './IListaMenuItem';

export default interface IlistaMenuStates{
    groups: IGroup[];
    items: IListaMenuItem[];
    indexCarta: number;
    indexGuarnicion: number;
    indexIngrediente: number;
}