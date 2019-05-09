import * as React from 'react';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import '@pnp/polyfill-ie11';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class BarraComando extends React.Component<IButtonProps,{}>{
    public render(): JSX.Element {
        const { disabled, checked } = this.props;

        return (
              <div style={{ display: 'flex', alignItems: 'stretch', height: '40px'}}>
                <CommandBarButton
                  data-automation-id="nuevo"
                  disabled={disabled}
                  checked={checked}
                  iconProps={{ iconName: 'AddNotes' }}
                  text="Nuevo"
                  menuProps={{
                    items: [
                      {
                        key: 'carta',
                        text: 'Carta',
                        iconProps: { iconName: 'Carta1' }
                      },
                      {
                        key: 'guarnicion',
                        text: 'Guarnicion',
                        iconProps: { iconName: 'Guarnicion1' }
                      },
                      {
                        key: 'ingrediente',
                        text: 'Ingrediente',
                        iconProps: { iconName: 'Ingrediente1' }
                      }
                    ]
                  }}
                />
                <CommandBarButton
                  data-automation-id="eliminar"
                  disabled={disabled}
                  checked={checked}
                  iconProps={{ iconName: 'Delete' }}
                  text="Eliminar"
                  split={true}
                  
                  
                />
                <CommandBarButton
                  data-automation-id="modificar"
                  disabled={disabled}
                  checked={checked}
                  iconProps={{ iconName: 'Edit' }}
                  text="Modificar"
                />
              </div>
          );
        }
      }
