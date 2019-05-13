import * as React from 'react';
import styles from './GenerarPedido.module.scss';
import { IGenerarPedidoProps, IGenerarPedidoState } from './IGenerarPedidoProps';
import { escape } from '@microsoft/sp-lodash-subset';

/*COMAND BAR COMPONENTS*/

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

/*SHIMERED DETAILS LIST COMPONENTS*/

import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { IColumn, buildColumns, SelectionMode, Toggle } from 'office-ui-fabric-react/lib/index';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';

const ITEMS_COUNT = 200;
const INTERVAL_DELAY = 2500;

let _items: string[];


export default class GenerarPedido extends React.Component<IGenerarPedidoProps, IGenerarPedidoState> {

  private _lastIntervalId: number;
  private _lastIndexWithData: number;

  constructor(props: IGenerarPedidoProps) {
    super(props);

    this.state = {
      items: [],
      columns: _buildColumns(),
      isDataLoaded: false
    };
  }


  public render(): React.ReactElement<IGenerarPedidoProps> {

    return (
      <div className={ styles.generarPedido }>
        <div className={ styles.container }>
          <div className={ styles.header }>
            <p className={ styles.headertitle }>PLANILLA DE PEDIDOS</p>
          </div>
          <CommandBar
            items={this.getItems()}
            farItems={this.getFarItems()}
          />
          <ShimmeredDetailsList
            setKey="items"
            items={this.state.items}
            columns={this.state.columns}
            selectionMode={SelectionMode.none}
            listProps={{ renderedWindowsAhead: 0, renderedWindowsBehind: 0 }}
          />

        </div>
      </div>
    );
  }

  private getItems = () => {
    return [
      {
        key: 'newItem',
        name: 'New',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New',
        onClick: () => {

        }
      },
      {
        key: 'upload',
        name: 'Upload',
        iconProps: {
          iconName: 'Upload'
        },
        href: 'https://dev.office.com/fabric',
        ['data-automation-id']: 'uploadButton'
      },
      {
        key: 'share',
        name: 'Share',
        iconProps: {
          iconName: 'Share'
        },
        onClick: () => console.log('Share')
      },
      {
        key: 'download',
        name: 'Download',
        iconProps: {
          iconName: 'Download'
        },
        onClick: () => console.log('Download')
      }
    ];
  };

  private getOverlflowItems = () => {
    return [
      {
        key: 'move',
        name: 'Move to...',
        onClick: () => console.log('Move to'),
        iconProps: {
          iconName: 'MoveToFolder'
        }
      },
      {
        key: 'copy',
        name: 'Copy to...',
        onClick: () => console.log('Copy to'),
        iconProps: {
          iconName: 'Copy'
        }
      },
      {
        key: 'rename',
        name: 'Rename...',
        onClick: () => console.log('Rename'),
        iconProps: {
          iconName: 'Edit'
        }
      }
    ];
  };

  private getFarItems = () => {
    return [
      {
        key: 'sort',
        name: 'Sort',
        ariaLabel: 'Sort',
        iconProps: {
          iconName: 'SortLines'
        },
        onClick: () => console.log('Sort')
      },
      {
        key: 'tile',
        name: 'Grid view',
        ariaLabel: 'Grid view',
        iconProps: {
          iconName: 'Tiles'
        },
        iconOnly: true,
        onClick: () => console.log('Tiles')
      },
      {
        key: 'info',
        name: 'Info',
        ariaLabel: 'Info',
        iconProps: {
          iconName: 'Info'
        },
        iconOnly: true,
        onClick: () => console.log('Info')
      }
    ];
  };

}

function _buildColumns(): IColumn[] {
  const _item = createListItems(1);
  const columns: IColumn[] = buildColumns(_item);

  for (const column of columns) {
    if (column.key === 'thumbnail') {
      column.name = 'FileType';
      column.minWidth = 16;
      column.maxWidth = 16;
      column.isIconOnly = true;
      column.iconName = 'Page';
      break;
    }
  }

  return columns;
}
