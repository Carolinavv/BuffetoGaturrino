import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import pnp from 'sp-pnp-js';

import * as strings from 'ActualizarMenuWebPartStrings';
import ActualizarMenu from './components/ActualizarMenu';
import { IActualizarMenuProps } from './components/IActualizarMenuProps';
import { PnPClientStorage } from '@pnp/common';

export interface IActualizarMenuWebPartProps {
  description: string;
}

export default class ActualizarMenuWebPart extends BaseClientSideWebPart<IActualizarMenuWebPartProps> {


  public onInit(): Promise<void> {
    return super.onInit().then(_=>{
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IActualizarMenuProps > = React.createElement(
      ActualizarMenu,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
