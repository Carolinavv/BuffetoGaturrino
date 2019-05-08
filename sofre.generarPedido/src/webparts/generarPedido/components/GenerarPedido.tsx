import * as React from 'react';
import styles from './GenerarPedido.module.scss';
import { IGenerarPedidoProps } from './IGenerarPedidoProps';
import { IGenerarPedidoState } from './IGenerarPedidoState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { FormPedido } from './FormPedido/FormPedido';
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import { render } from 'react-dom';
import { inputProperties } from '@uifabric/utilities/lib';

const tiposComida: IDropdownOption[] = [
  { key: 'sandwich', text: 'Sandwich' },
  { key: 'plato', text: 'Al Plato' },
  { key: 'ensalada', text: 'Ensalada' }
];


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
      listGuarni: [],
      listCategoria: []
    };
    this.getListGuarni.bind(this);


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
          <FormPedido {...this.props}></FormPedido>
        </div>
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    console.dir(option);
  }

  private getTipoComida = (option?: IDropdownOption, index?: number) => {
    alert(option.text);
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
      
      let categoriaDropdown: IDropdownOption[] = [];

      for (let index = 0; index < data.length; index++) {
        categoriaDropdown.push({key: index.toString(), text: data[index]["Title"]});
      }

      this.setState({listCategoria: categoriaDropdown});

    });

  }

}
