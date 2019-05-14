import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IPanelStates{
    showPanel: boolean;
}
export interface IPanelProps{
  onClose: Function;
}


export default class PanelDerechoCarta extends React.Component<IPanelProps, IPanelStates> {
    public state = {
        showPanel: true
    }

    public render(){
      const textFieldIdNombre = getId('nombre');
        const textFieldIdPrecio = getId('precio');
        return(
            <Panel
                isOpen={this.state.showPanel}
                type={PanelType.smallFixedFar}
                onDismiss={this._hidePanel}
                headerText="Carta"
                onRenderFooterContent={this._onRenderFooterContent}
            >

            <Label htmlFor={textFieldIdNombre}>Nombre:</Label>
            <TextField id={textFieldIdNombre} />

            <Dropdown 
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

            <Label htmlFor={textFieldIdPrecio}>Precio:</Label>
            <TextField id={textFieldIdPrecio} />

            <Dropdown 
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
            </Panel>

        );
    }

    

    private _onRenderFooterContent = () => {
        return (
          <div>
            <PrimaryButton onClick={this._hidePanel} style={{ marginRight: '8px' }}>
              Guardar
            </PrimaryButton>
            <DefaultButton onClick={this._showPanel}>Cancelar</DefaultButton>
          </div>
        );
      };

    private _showPanel = () => {
    this.setState({ showPanel: true });
    };

    private _hidePanel = () => {
      this.props.onClose();
    this.setState({ showPanel: false });  
    };

    // private _newItem(){
    //     return(
    //         <div></div>
    //     )
    }

    // private _log(str: string): () => void {
    //   return (): void => {
    //       console.log(str);
    //   };

