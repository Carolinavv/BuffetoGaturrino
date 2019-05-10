import * as React from 'react';
import styles from './PantallaCarga.module.scss';

export class PantallaCarga extends React.Component<any, any> {
  public render(): React.ReactElement<any> {
    return (
      <div className={ styles.pantallaCarga }>
        <div className={ styles.container }>
            <div className={styles.loadingBox}>
                <img className={styles.rotating} src={require('../../assets/img/richard.png')} alt="" width="100px" />
            </div>
        </div>
      </div>
    );
  }
}
