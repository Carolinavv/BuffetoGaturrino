import * as React from 'react';
import styles from './Header.module.scss';
import { IHeaderState } from './IHeaderState';
import { IHeaderProps } from './IHeaderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { FormPedido } from '../FormPedido/FormPedido';
import { PantallaCarga } from '../PantallaCarga/PantallaCarga';
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import { render } from 'react-dom';
import { inputProperties } from '@uifabric/utilities/lib';

export class Header extends React.Component<IHeaderProps, IHeaderState> {

    constructor(props) {
        super(props);
        this.state = {
            description: "",
            listCategoria: [],
            mostrarPedido: false,
            loadingScreen: false,
            opcion: ""
        
        };
        // this.getListGuarni = this.getListGuarni.bind(this);
        this.getListCarta.bind(this)
    }

    public componentDidMount() {
        this.getListCategoria();
        this.getListCarta();
    }

    public render(): React.ReactElement<IHeaderProps> {

        return (
            <div className={styles.header}>
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

    public getListCarta() {
        sp.web.lists.getByTitle("carta").items.select("Title").orderBy("Title").top(5000).get().then((data: any[]) => {
            console.log(data)
        });

    }
    
    public getListCategoria() {
        sp.web.lists.getByTitle("categoria").items.select("Title").orderBy("Title").top(5000).get().then((data: any[]) => {

            let categoriaDropdown: IDropdownOption[] = [
                { key: 'categoriaHeader', text: 'Tipo de comida', itemType: DropdownMenuItemType.Header },
                // { key: 'ninguno', text: 'Ninguno' },
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
            this.setState({loadingScreen: true});
            this.setState({ mostrarPedido: false });
            setTimeout(() => {
                this.setState({ opcion: option.text, mostrarPedido: true, loadingScreen: false });
          }, 1000);
        }
      }

    //   public getListGuarni() {
    //     sp.web.lists.getByTitle("guarnicion").items.select("Title").orderBy("Title", true).top(5000).get().then((data: any[]) => {

    //       let arrayGuarnicion: string[] = [];
    //       let guarniDropdown: IDropdownOption[] =  [
    //         { key: 'guarniHeader', text: 'Elija una guarnicion', itemType: DropdownMenuItemType.Header },
    //         { key: 'ninguno', text: 'Ninguno' }
    //       ];

    //       for (let index = 0; index < data.length; index++) {
    //         arrayGuarnicion[index] = data[index]["Title"];
    //         guarniDropdown.push({key: index.toString(), text: arrayGuarnicion[index]});
    //       }
    //       this.setState({listGuarni: guarniDropdown});
    //     });

    //   }

}
