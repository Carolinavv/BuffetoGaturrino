import * as React from 'react';
import styles from './ActualizarMenu.module.scss';
import { IActualizarMenuProps } from './IActualizarMenuProps';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class ActualizarMenu extends React.Component<IActualizarMenuProps, {}> {
  public render(): React.ReactElement<IActualizarMenuProps> {
    return (
      <div className={ styles.actualizarMenu }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
             
            </div>
          </div>
        </div> 
      </div>
    );
  }
}
