import * as React from 'react';
import styles from './FormularioNuevoGI.module.scss';
import {IFormularioNuevoGIProps} from './IFormularioNuevoGIProps';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export default class FormularioNuevoGI extends React.Component<IFormularioNuevoGIProps, any>{
    public render() {
        const textFieldIdNombre = getId('nombre');
        // const { disabled, checked } = this.props;
        return(
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">

                <h3>{this.props.titulo}</h3>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1" ></div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5" >
                        <Label htmlFor={textFieldIdNombre}>Nombre:</Label>
                        <TextField  id={textFieldIdNombre} />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5" >
                    <Toggle 
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
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1" ></div>
                    </div>

                    <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" ></div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" >
                        <DefaultButton
                            primary={true}
                            data-automation-id='test'
                            // disabled={disabled}
                            // checked={checked}
                            text='Aceptar'
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" >
                        <DefaultButton
                            primary={true}
                            data-automation-id='test'
                            // disabled={disabled}
                            // checked={checked}
                            text='Cancelar'
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" ></div>
                    </div>
                

            </div>
            
        );
    }}