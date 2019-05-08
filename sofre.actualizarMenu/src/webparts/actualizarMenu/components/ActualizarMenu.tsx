import * as React from 'react';
import styles from './ActualizarMenu.module.scss';
import { IActualizarMenuProps } from './IActualizarMenuProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import ListaMenu from './ListaMenu/ListaMenu';

export default class ActualizarMenu extends React.Component<IActualizarMenuProps, {}> {
  public render(): React.ReactElement<IActualizarMenuProps> {
    return (
      <div className={ styles.actualizarMenu }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <p>gg</p>
             <ListaMenu></ListaMenu>
            </div>
        </div> 
      </div>
    );
  }
}
