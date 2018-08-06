import * as React from 'react';
import './App.css';
import Input from './components/input';

import {Row, Col} from 'reactstrap';

import MyForm from './my_form';

import logo from './logo.svg';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface IUser {
  last_name: string
  first_name: string
  email: string
}
async function showResults(values: IUser) {
  await sleep(500);
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          Hello.
        </p>
        <Input />

        <Row>
          <Col sm={10}>
            <h3>フォーム画面</h3>
            <MyForm onSubmit={showResults}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
