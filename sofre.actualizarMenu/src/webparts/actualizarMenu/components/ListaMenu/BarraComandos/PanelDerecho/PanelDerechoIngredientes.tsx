import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelStates{
    showPanel: boolean;
}

export interface IPanelProps{
    newItem: boolean;
}

export default class PanelDerechoIngredientes extends React.Component<IPanelProps, IPanelStates> {
    public state = {
        showPanel: false
    }

    public render(){
        return(
            <Panel
                isOpen={this.state.showPanel}
                type={PanelType.smallFixedFar}
                onDismiss={this._hidePanel}
                headerText=""
                onRenderFooterContent={this._onRenderFooterContent}
            >

            {/* TU CONTENIDO ACÁ */}



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
    this.setState({ showPanel: false });
    };

    // private _newItem(){
    //     return(
    //         <div></div>
    //     )
    }

