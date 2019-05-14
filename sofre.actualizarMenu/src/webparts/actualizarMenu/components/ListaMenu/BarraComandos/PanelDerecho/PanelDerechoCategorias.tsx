import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IPanelStates{
    showPanel: boolean;
}

export interface IPanelProps{
  onClose: Function;
}

export default class PanelDerechoCategorias extends React.Component<IPanelProps, IPanelStates> {
    public state = {
        showPanel: true
    }

    public render(){
      const textFieldIdNombre = getId('nombre');
        return(
            <Panel
                isOpen={this.state.showPanel}
                type={PanelType.smallFixedFar}
                onDismiss={this._hidePanel}
                headerText=""
                onRenderFooterContent={this._onRenderFooterContent}
            >

            {/* TU CONTENIDO ACÁ */}

            <h3>Categorías</h3>
            <Label htmlFor={textFieldIdNombre}>Nombre:</Label>
            <TextField  id={textFieldIdNombre} />
            <Dropdown 
              placeHolder='Seleccione las opciones'
              label='Guarnición:'
              defaultSelectedKeys={['Guarnicion1', 'Guarnicion2', 'Guarnicion3']}
              multiSelect
              options={
                      [
                        { key: 'Prueba1', text: 'Guarnicion1' },
                        { key: 'Prueba2', text: 'Guarnicion2' },
                        { key: 'Prueba3', text: 'Guarnicion3' }
                      ]
                     }
            />

            {/* TU CONTENIDO ACÁ */}
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

