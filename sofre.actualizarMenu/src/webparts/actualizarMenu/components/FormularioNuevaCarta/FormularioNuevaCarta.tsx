import * as React from 'react';
import styles from './FormularioNuevaCarta.module.scss';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';



export default class FormularioNuevaCarta extends React.Component<any, any>{
    render() {
        const textFieldIdNombre = getId('nombre');
        const textFieldIdPrecio = getId('precio');
        const { disabled, checked } = this.props;
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">

                    <h3>Carta</h3>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6" >
                        <Label htmlFor={textFieldIdNombre}>Nombre:</Label>
                        <TextField className={styles.ancho200} id={textFieldIdNombre} />

                        <Dropdown className={styles.ancho200}
                            placeHolder='Seleccione las opciones'
                            label='Categoria:'
                            defaultSelectedKeys={['Prueba1', 'Prueba2', 'Prueba3']}
                            multiSelect
                            options={
                                [
                                    { key: 'Prueba1', text: 'Prueba1' },
                                    { key: 'Prueba2', text: 'Prueba2' },
                                    { key: 'Prueba3', text: 'Prueba3' }
                                ]
                            }
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6" >
                        <Label htmlFor={textFieldIdPrecio}>Precio:</Label>
                        <TextField className={styles.ancho200} id={textFieldIdPrecio} />

                        <Dropdown className={styles.ancho200}
                            placeHolder='Seleccione las opciones'
                            label='Guarnición:'
                            defaultSelectedKeys={['Prueba1', 'Prueba2', 'Prueba3']}
                            multiSelect
                            options={
                                [
                                    { key: 'Prueba1', text: 'Prueba1' },
                                    { key: 'Prueba2', text: 'Prueba2' },
                                    { key: 'Prueba3', text: 'Prueba3' }
                                ]
                            }
                        />
                                        <Toggle className={styles.ancho200}
                        defaultChecked={true}
                        label='Disponibilidad'
                        onAriaLabel='This toggle is checked. Press to uncheck.'
                        offAriaLabel='This toggle is unchecked. Press to check.'
                        onText='On'
                        offText='Off'
                        onFocus={() => console.log('onFocus called')}
                        onBlur={() => console.log('onBlur called')}
                    />
                    </div>




                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" ></div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" >
                        <DefaultButton
                            primary={true}
                            data-automation-id='test'
                            disabled={disabled}
                            checked={checked}
                            text='Aceptar'
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" >
                        <DefaultButton
                            primary={true}
                            data-automation-id='test'
                            disabled={disabled}
                            checked={checked}
                            text='Cancelar'
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" ></div>
                
                
                </div>



                    
                    

            </div>
        );

    }

    private _log(str: string): () => void {
        return (): void => {
            console.log(str);
        }

    }
}


