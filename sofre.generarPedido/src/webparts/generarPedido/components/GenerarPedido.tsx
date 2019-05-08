import * as React from 'react';
import styles from './GenerarPedido.module.scss';
import { IGenerarPedidoProps } from './IGenerarPedidoProps';
import { IGenerarPedidoState } from './IGenerarPedidoState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { FormPedido } from './FormPedido/FormPedido';
import { PantallaCarga } from './PantallaCarga/PantallaCarga';
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import { render } from 'react-dom';
import { inputProperties } from '@uifabric/utilities/lib';
            
export default class GenerarPedido extends React.Component<IGenerarPedidoProps, IGenerarPedidoState> {

  constructor(props) {
    super(props);
    this.state = {
      listGuarni: [],
      listCategoria: [],
      opcion: null,
      mostrarPedido: false,
      loadingScreen: false
    };
    this.getListGuarni = this.getListGuarni.bind(this);


  }

  public componentDidMount() {
    this.getListGuarni();
  }

  public render(): React.ReactElement<IGenerarPedidoProps> {

    return (
      <div className={ styles.generarPedido }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={styles.col6}>
              <TextField
                label="Nombre y Apellido"
                placeholder="Ingrese su nombre y apellido"
                required
              />
            </div>
            <div className={ styles.col6 }>
              <Dropdown 
                defaultSelectedKey="default"
                label="Elija el tipo de comida"
                placeholder="Seleccione una opcion"
                required={true}
                options={this.state.listCategoria}
                onChanged={this.getTipoComida}
              />
            </div>
          </div>
          {this.state.loadingScreen &&
          <PantallaCarga />
          }
          {this.state.mostrarPedido &&
          <FormPedido opcion={this.state.opcion}></FormPedido>
          }
        </div>
      </div>
    );
  }

  private getTipoComida = (option?: IDropdownOption, index?: number) => {

    if (option.key == 'ninguno') {
      this.setState({ opcion: option.text, mostrarPedido: false });  
    }
    else {
      this.setState({loadingScreen: true});
      this.setState({ mostrarPedido: false });
      setTimeout(() => {
        this.setState({ opcion: option.text, mostrarPedido: true, loadingScreen: false });
      }, 1000);
    }
  }

  public getListGuarni() {
    sp.web.lists.getByTitle("guarnicion").items.select("Title").orderBy("Title", true).top(5000).get().then((data: any[]) => {
      
      let arrayGuarnicion: string[] = [];
      let guarniDropdown: IDropdownOption[] =  [
        { key: 'guarniHeader', text: 'Elija una guarnicion', itemType: DropdownMenuItemType.Header },
        { key: 'ninguno', text: 'Ninguno' }
      ];

      for (let index = 0; index < data.length; index++) {
        arrayGuarnicion[index] = data[index]["Title"];
        guarniDropdown.push({key: index.toString(), text: arrayGuarnicion[index]});
      }
      this.setState({listGuarni: guarniDropdown});
    });

    sp.web.lists.getByTitle("categoria").items.select("Title").orderBy("Title").top(5000).get().then((data: any[]) => {
      
      let categoriaDropdown: IDropdownOption[] = [
        { key: 'ninguno', text: 'Ninguno' }
      ];

      for (let index = 0; index < data.length; index++) {
        categoriaDropdown.push({key: index.toString(), text: data[index]["Title"]});
      }

      this.setState({listCategoria: categoriaDropdown});

    });

  }

}
