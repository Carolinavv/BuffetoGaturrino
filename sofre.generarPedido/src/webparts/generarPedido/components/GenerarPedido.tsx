import * as React from 'react';
import styles from './GenerarPedido.module.scss';
import { IGenerarPedidoProps } from './IGenerarPedidoProps';
import { IGenerarPedidoState } from './IGenerarPedidoState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { sp } from '@pnp/sp';




const options: IDropdownOption[] = [
  { key: 'default', text: 'Select an option' },
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];

const aderezosList: IDropdownOption[] = [
  { key: 'aderezosHeader', text: 'Seleccione los aderezos que desea', itemType: DropdownMenuItemType.Header },
  { key: 'ninguno', text: 'Ninguno' },
  { key: 'mayonesa', text: 'Mayonesa' },
  { key: 'ketchup', text: 'Ketchup' },
  { key: 'mostaza', text: 'Mostaza' },
  { key: 'sal', text: 'Sal' }
];
export default class GenerarPedido extends React.Component<IGenerarPedidoProps, IGenerarPedidoState> {

  constructor(props) {
    super(props);
    this.state = {
      listGuarni: []
    };
    this.getListGuarni.bind(this);


  }
  public componentDidMount(){
    getListGuarni


  }

  public render(): React.ReactElement<IGenerarPedidoProps> {

    // this.getListGuarni();

    return (
      <div className={ styles.generarPedido }>
        <div className={ styles.container }>
        <form action="">
        </form>
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
                options={options}
                
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col6}>
              <Dropdown
                className={styles.formblock}
                defaultSelectedKey="default"
                label="Elija el plato"
                options={options}
              />
              <div className={styles.checkbox}>
                <Checkbox label="Cubiertos" className={styles.formcheckbox} />
                <Checkbox label="Pan" className={styles.formcheckbox} />
              </div>
            </div>
            <div className={styles.col6}>
              <Dropdown
                className={styles.formblock}
                defaultSelectedKey="ninguno"
                label="Guarnición"
                options={this.state.listGuarni}
                onLoad={this.getListGuarni}
            />
              <Dropdown
                className={styles.formblock}
                defaultSelectedKeys={['ninguno']}
                multiSelect
                label="Aderezos"
                options={aderezosList}
              />
            </div>
          </div>
          <div className={styles.morePedidos}></div>
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
                // onClick= {this.mostrarPantalla()}
                />
              </div>
              <div>
                <DefaultButton
                  className={styles.button}
                  text="Enviar Pedido"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    console.dir(option);
  }


  public getListGuarni() {
    sp.web.lists.getByTitle("guarnicion").items.select("Title").orderBy("Title", true).get().then((data: any[]) => {
      
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
      console.log(guarniDropdown);
      console.log(this.state.listGuarni);
    });

  }

}
