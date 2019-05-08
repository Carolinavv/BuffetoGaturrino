import * as React from 'react';
import styles from './FormPedido.module.scss';
import { IFormPedidoProps } from './IFormPedidoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import { render } from 'react-dom';
import { inputProperties } from '@uifabric/utilities/lib';


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

export class FormPedido extends React.Component<IFormPedidoProps, {}> {
  public render(): React.ReactElement<IFormPedidoProps> {
    return (
      <div className={ styles.formPedido }>
        <div className={ styles.container }>
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
                options={aderezosList}
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
                  onClick={this.mostrarPantalla}
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

    sp.web.lists.getByTitle("categoria").items.select("Title").orderBy("Title").top(5000).get().then((data: any[]) => {

      let categoriaDropdown: IDropdownOption[] = [];

      for (let index = 0; index < data.length; index++) {
        categoriaDropdown.push({ key: index.toString(), text: data[index]["Title"] });
      }

      this.setState({ listCategoria: categoriaDropdown });

    });

  }

}
