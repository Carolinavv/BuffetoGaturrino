import * as React from 'react';
import styles from './ReportePorUsuario.module.scss';
import { IReportePorUsuarioProps } from './IReportePorUsuarioProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DetailsListBasicExample} from './ListaConFiltro/listaConFiltro';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from '@pnp/sp';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import {IReportePorUsuario} from './IReportePorUsuarioState';
import { IListaConFiltroItem, IListaPedidoDetalleState } from './ListaConFiltro/IListaConFiltro'


export default class ReportePorUsuario extends React.Component<IReportePorUsuarioProps, {}> {

  constructor(props) {
    super(props);
    this.state = {
      listPedidoDetalle: []
    
    };
    this.getListPedidoDetalle = this.getListPedidoDetalle.bind(this);


  }

  public getListPedidoDetalle() {
    sp.web.lists.getByTitle("Pedido Detalle").items.select("peddtUsuario/Title", "peddtUsuario/EMail").expand("peddtUsuario").orderBy("Title", true).top(5000).get().then((data: any[]) => {
        let listPeddet: IListaConFiltroItem[];
        let arrayPedidoDetalle: string[] = []; 

        for (let index = 0; index < data.length; index++) {
        arrayPedidoDetalle[index] = data[index]["peddtUsuario"]["EMail"];
        //console.log({ key: index, text: arrayPedidoDetalle[index] });
        console.log(data[index]["peddtUsuario"]["EMail"]);

        listPeddet.push({ key: index.toString(), text: arrayPedidoDetalle[index] });
        //console.log(listPeddet);
        

        
        }
        this.setState({items:listPeddet});
        

    });

}

  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }
  public componentDidMount() {

    this.getListPedidoDetalle();
  }




  public render(): React.ReactElement < IReportePorUsuarioProps > {
  return(
      <div className = { styles.reportePorUsuario } >
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            

            <PeoplePicker
              context={this.props.context}
              titleText="Seleccione Usuario"
              personSelectionLimit={3}
              groupName={""} // Leave this blank in case you want to filter from all users
              showtooltip={true}
              isRequired={true}
              disabled={false}
              selectedItems={this._getPeoplePickerItems}
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={1000} />

            <div>
              <DetailsListBasicExample/>
            </div>

            




          </div>
        </div>
      </div>
      </div>
    );
  }
}
