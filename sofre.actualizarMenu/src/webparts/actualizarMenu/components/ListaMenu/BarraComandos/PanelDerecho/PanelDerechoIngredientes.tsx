import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';


export interface IPanelStates{
    showPanel: boolean;
}

export interface IPanelProps{
    onClose: Function;
}

export default class PanelDerechoGuarnicion extends React.Component<IPanelProps, IPanelStates> {
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
                headerText="Ingredientes"
                onRenderFooterContent={this._onRenderFooterContent}
            >

            <Label htmlFor={textFieldIdNombre}>Nombre:</Label>
            <TextField  id={textFieldIdNombre} />
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