import * as React from 'react';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import '@pnp/polyfill-ie11';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

export default class BarraComando extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <CommandBar
          items={this.getItems()}
          // farItems={this.getFarItems()}
        />
      </div>
    );
  }

  // Data for CommandBar
  private getItems = () => {
    return [
      {
        key: 'nuevo',
        name: 'Nuevo',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New',
        subMenuProps: {
          items: [
            {
              key: 'carta',
              name: 'Carta',
              iconProps: {
                iconName: 'EatDrink'
              }
            },
            {
              key: 'ingrediente',
              name: 'Ingrediente',
              iconProps: {
                iconName: 'FastMode'
              }
            },
            {
              key: 'guarnicion',
              name: 'Guarnicion',
              iconProps: {
                iconName: 'Wines'
              }
            }
          ]
        }
      },
      {
        key: 'borrar',
        name: 'Borrar',
        iconProps: {
          iconName: 'Delete'
        },
        ['data-automation-id']: 'deleteButton'
      },
      {
        key: 'modificar',
        name: 'Modificar',
        iconProps: {
          iconName: 'Edit'
        }
      },
    ];
  };

  // private getFarItems = () => {
  //   return [
  //     {
  //       key: 'ordenar',
  //       name: 'Ordenar',
  //       ariaLabel: 'Sort',
  //       iconProps: {
  //         iconName: 'SortLines'
  //       }
  //     },
  //     {
  //       key: 'tile',
  //       name: 'Grid view',
  //       ariaLabel: 'Grid view',
  //       iconProps: {
  //         iconName: 'Tiles'
  //       },
  //       iconOnly: true,
  //       onClick: () => console.log('Tiles')
  //     },
  //     {
  //       key: 'info',
  //       name: 'Info',
  //       ariaLabel: 'Info',
  //       iconProps: {
  //         iconName: 'Info'
  //       },
  //       iconOnly: true,
  //       onClick: () => console.log('Info')
  //     }
  //   ];
  // };
}






// export class CommandBarBasicExample extends React.Component<{}, {}> {
//   public render(): JSX.Element {
//     return (
//       <div>
//         <CommandBar
//           items={this.getItems()}
//           overflowButtonProps={{ ariaLabel: 'More commands' }}
//         />
//       </div>
//     );
//   }

//   private getItems = () => {
//     return [
//       {
//         key: 'carta',
//         text: 'Carta',
//         iconProps: { iconName: 'Carta1' }
//       },
//       {
//         key: 'guarnicion',
//         text: 'Guarnicion',
//         iconProps: { iconName: 'Guarnicion1' }
//       },
//       {
//         key: 'ingrediente',
//         text: 'Ingrediente',
//         iconProps: { iconName: 'Ingrediente1' }
//       }

//     ];
//   };
// }

  

        







// export default class BarraComando extends React.Component<IButtonProps,{}>{
//     public render(): JSX.Element {
//         const { disabled, checked } = this.props;

//         return (
//               <div style={{ display: 'flex', alignItems: 'stretch', height: '40px'}}>
//                 <CommandBarButton
//                   data-automation-id="nuevo"
//                   disabled={disabled}
//                   checked={checked}
//                   iconProps={{ iconName: 'AddNotes' }}
//                   text="Nuevo"
//                   menuProps={{
//                     items: [
//                       {
//                         key: 'carta',
//                         text: 'Carta',
//                         iconProps: { iconName: 'Carta1' }
//                       },
//                       {
//                         key: 'guarnicion',
//                         text: 'Guarnicion',
//                         iconProps: { iconName: 'Guarnicion1' }
//                       },
//                       {
//                         key: 'ingrediente',
//                         text: 'Ingrediente',
//                         iconProps: { iconName: 'Ingrediente1' }
//                       }
//                     ]
//                   }}
//                 />
//                 <CommandBarButton
//                   data-automation-id="eliminar"
//                   disabled={disabled}
//                   checked={checked}
//                   iconProps={{ iconName: 'Delete' }}
//                   text="Eliminar"
//                   split={true}
                  
                  
//                 />
//                 <CommandBarButton
//                   data-automation-id="modificar"
//                   disabled={disabled}
//                   checked={checked}
//                   iconProps={{ iconName: 'Edit' }}
//                   text="Modificar"
//                 />
//               </div>
//           );
//         }
//       }
