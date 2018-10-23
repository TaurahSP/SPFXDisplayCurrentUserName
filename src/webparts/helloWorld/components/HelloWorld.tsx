import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloUserPartProps,IHelloUserPartState } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloUserPartProps,IHelloUserPartState> {

//set state in constructor and gete property from parent
  constructor(props: IHelloUserPartProps) 
  {
  super(props);
  this.state = { data: null, isValid: false };
  }

  public componentDidMount(): void {
      fetch(
          '../../_api/web/currentuser',
          {
              method: 'GET',
              credentials: 'same-origin',
              headers: {
                  'accept': 'application/json'
              }
          }
          ).then(response => {
              return response.json();
          }).then(json => {
              console.log(json);
              this.setState({ data: json.Title, isValid: true });
          }).catch(e => {
              console.log(e);
          });
      }


  public render(): React.ReactElement<IHelloUserPartProps> {
    return (
      <div className={ styles.helloWorld }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.state.data)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
