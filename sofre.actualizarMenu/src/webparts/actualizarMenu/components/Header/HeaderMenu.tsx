import * as React from 'react';
import { HeaderMenuProps } from './HeaderMenuProps';

export default class HeaderMenu extends React.Component<HeaderMenuProps, any>{
    
    public render(){
        return(
                <div>
                    <h1 className="ms-fontSize-42">{ this.props.title }</h1>
                </div>
        );
    }
}