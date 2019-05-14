import * as React from 'react';
import styles from './GenerarPedido.module.scss';
import { IGenerarPedidoProps } from './IGenerarPedidoProps';
import { IGenerarPedidoState } from './IGenerarPedidoState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import { render } from 'react-dom';
import { inputProperties } from '@uifabric/utilities/lib';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';


export default class GenerarPedido extends React.Component<IGenerarPedidoProps, IGenerarPedidoState> {

  constructor(props) {
    super(props);
    this.state = {
      listCarta: [],
      listGuarni: [],
      listCategoria: [],
      opcion: null,
      mostrarPedido: false,
      loadingScreen: false,
      showPanel: false
    };
    // this.getListGuarni = this.getListGuarni.bind(this);
  }

  public componentDidMount() {
    this.getListCategoria();
  }

  public render(): React.ReactElement<IGenerarPedidoProps> {

    return (


      <div>
        <div>
          <h1>Carga tu pedido !!!</h1>
          <h3>User: Nacho</h3>
          <p>Pedido numero: 1234</p>
          <p>Fecha: 22/11/2019</p>
        </div>
        <hr/>
        <div>
          <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Nuevo pedido" />
          <DefaultButton className={styles.button} text="Enviar Pedido"/>
        </div>
        <Panel isOpen={this.state.showPanel} onDismiss={this._hidePanel} type={PanelType.large} headerText="Large Panel">
          <div >
            <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles.col6}>
                  <TextField
                    label="Nombre y Apellido"
                    placeholder="Ingrese su nombre y apellido"
                    required
                  />
                </div>
                <div className={styles.col6}>
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
              {/* {this.state.loadingScreen &&
                <PantallaCarga />
              }
              {this.state.mostrarPedido &&
                <FormPedido opcion={this.state.opcion}></FormPedido>
              } */}


            </div>
          </div>


          {this.state.mostrarPedido &&
            <div>
              <div className={styles.container}>
                <div className={styles.row}>
                  <div className={styles.col6}>
                    <Dropdown
                      className={styles.formblock}
                      defaultSelectedKey="default"
                      label="Elija el plato"
                      options={this.state.listCarta}
                    />
                    <div className={styles.checkbox}>
                      <Checkbox label="Cubiertos" className={styles.formcheckbox} />
                      <Checkbox label="Pan" className={styles.formcheckbox} />
                    </div>
                  </div>
                  <div className={styles.col6}>
                    <Dropdown
                      className={styles.formblock}
                      defaultSelectedKey={'ninguno'}
                      label="Guarnición"
                      options={this.state.listGuarni}
                      onLoad={this.getListGuarni}
                    />
                    <Dropdown
                      className={styles.formblock}
                      defaultSelectedKeys={["ninguno"]}
                      multiSelect
                      label="Aderezos"
                    // options={aderezosList}
                    />
                  </div>
                </div>
                <div className={styles.morePedidos} id="agregar"></div>
                <div className={styles.formprecio}>Subtotal: subtotalporpnp</div>
                <div className={styles.row}>
                  <div className={styles.col9}>
                    <ChoiceGroup
                      defaultSelectedKey="B"
                      options={[
                        {
                          key: 'A',
                          text: 'Llevar pedido a',
                          onRenderField: (props, render) => {
                            return (
                              <div>
                                <div className={styles.coltext1}>
                                  {render!(props)}
                                </div>
                                <TextField
                                  className={styles.coltext2}
                                  disabled={props ? !props.checked : false}
                                  placeholder="Oficina"
                                  required
                                />
                              </div>
                            );
                          }
                        },
                        {
                          key: 'B',
                          text: 'Retiro en el Buffet',
                        }
                      ]}
                      onChange={this._onChange}
                      label="Seleccione una opcion"
                    />
                  </div>
                  <div className={styles.col3}>
                    <div>
                      <DefaultButton
                        className={styles.buttonagregar}
                        text="Agregar Pedido"
                      />
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

        </Panel>
      </div>
    );
  }

  public getListCategoria() {
    sp.web.lists.getByTitle("categoria").items.select("Title").orderBy("Title", true).top(5000).get().then((data: any[]) => {

      console.log(data)

      let categoriaDropdown: IDropdownOption[] = [
        { key: 'categoriaHeader', text: 'Tipo de comida', itemType: DropdownMenuItemType.Header },
        { key: 'ninguno', text: 'Ninguno' },
      ];

      for (let index = 0; index < data.length; index++) {
        categoriaDropdown.push({ key: index.toString(), text: data[index]["Title"] });
      }

      this.setState({ listCategoria: categoriaDropdown });

    });
  }


  private getTipoComida = (option?: IDropdownOption, index?: number) => {

    if (option.key == 'ninguno') {
      this.setState({ opcion: option.text, mostrarPedido: false });
    }
    else {
      // this.setState({ loadingScreen: true });
      this.setState({ mostrarPedido: true });
      console.log(option.text)
      this.getListComida(option.text)
      // setTimeout(() => {
      //   this.setState({ opcion: option.text, mostrarPedido: true, loadingScreen: false });
      // }, 1000);

    }
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    console.dir(option);
  }

  public getListGuarni() {
    sp.web.lists.getByTitle("guarnicion").items.select("Title").orderBy("Title", true).top(5000).get().then((data: any[]) => {

      let arrayGuarnicion: string[] = [];
      let guarniDropdown: IDropdownOption[] = [
        { key: 'guarniHeader', text: 'Elija una guarnicion', itemType: DropdownMenuItemType.Header },
        { key: 'ninguno', text: 'Ninguno' }
      ];

      for (let index = 0; index < data.length; index++) {
        arrayGuarnicion[index] = data[index]["Title"];
        guarniDropdown.push({ key: index.toString(), text: arrayGuarnicion[index] });
      }
      this.setState({ listGuarni: guarniDropdown });
    });

  }

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };

  private _showPanel = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ showPanel: true });
  };

  public getListGuarnicion(Categoria: string) {

    let arrayGuarnicion: string[] = [];
    let guarniDropdown: IDropdownOption[] = [
      { key: 'guarniHeader', text: 'Elija una guarnicion', itemType: DropdownMenuItemType.Header },
      { key: 'ninguno', text: 'Ninguno' }
    ];

    sp.web.lists.getByTitle("guarnición").items.select("Title", "carCategoria/Title").expand("carCategoria").filter("carCategoria/Title eq" + `'${Categoria}'`).top(5000).get().then((data: any[]) => {

      for (let index = 0; index < data.length; index++) {
        arrayGuarnicion[index] = data[index]["Title"];
        guarniDropdown.push({ key: index.toString(), text: arrayGuarnicion[index] });
      }
      this.setState({ listGuarni: guarniDropdown });
    });

  }

  public getListComida(Categoria: string) {
    let cartaDropdown: IDropdownOption[] = [
      { key: 'comidaHeader', text: 'Elija una su plato de comida', itemType: DropdownMenuItemType.Header },
      { key: 'ninguno', text: 'Ninguno' }
    ];

    sp.web.lists.getByTitle("carta").items.select("Title", "carCategoria/Title").expand("carCategoria").filter("carCategoria/Title eq" + `'${Categoria}'`).top(5000).get().then((data: any[]) => {

      for (let index = 0; index < data.length; index++) {
        cartaDropdown.push({ key: index.toString(), text: data[index]["Title"] });
      }
      this.setState({ listCarta: cartaDropdown });
    });
  }

}