import * as React from 'react';
import './App.css';
import logo from './logo.svg';


import CreatableSelect from 'react-select/lib/Creatable';
import {components} from 'react-select';
// import { colourOptions, groupedOptions } from '../data';


const loading = true

const Group = (props: any) => {
  console.log(props)

  if (loading && props.data.label === "tag"){
    return <img src={logo} className="App-logo" alt="logo" />
  } else {
    return(
      <components.Group {...props}/>
    )
  }
};

const MenuList = (props: any) => {
  return (
    <components.MenuList {...props}>
      <div style={{border: "5px solid green"}}>
        {props.children}
      </div>
    </components.MenuList>
  );
};


const tagsOptions = [
    {label: "one", value: "one", color: "blue"},
    {label: "two", value: "two", color: "red"},
    {label: "three", value: "three", color: "yellow"},
    {label: "four", value: "four", color: "green"},
];

interface MyState {
  inputValue: string,
  values: {label: string, value: string}[]
}

const colourStyles = {
  multiValue: (styles: any, { data }: any) => {
    const color = data.color;
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

class Myselect extends React.Component<{}, MyState> {
  state = {
    inputValue: '',
    values: []
  };

  handleChange = (newValue: any, actionMeta: any) => {

    const action = actionMeta.action

    if(action === "select-option") {
      if(actionMeta.option.value == "bbbb") {
        const newitem = {
          label: `filename:${this.state.inputValue}`,
          value: `filename::${this.state.inputValue}`,
          color: "gray",
        }
        this.setState({values: [...this.state.values, newitem] })
        return
      }
    } else if (action === "create-option") {
      const newitem = {
        label: `${this.state.inputValue}`,
        value: `${this.state.inputValue}`,
        color: "black",
      }
      this.setState({values: [...this.state.values, newitem] })
      return
    }
    this.setState({values: newValue})
  };

  handleInputChange = (inputValue: any, actionMeta: any) => {
    this.setState({inputValue})
  }
  render() {
    const groupedOptions = [
      {label: "search", options: [{label: `filename ${this.state.inputValue}`, value: "bbbb"}], value: ""},
      {label: "tag", options: tagsOptions, value: ""},
    ]

    return (
      <CreatableSelect
        isClearable
        isMulti
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={groupedOptions}

        inputValue={this.state.inputValue}
        value={this.state.values}

        styles={colourStyles}

        components={{Group, MenuList}}
        isValidNewOption={(i: any, v: any, o: any) => false}
      />
    );
  }
}

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

        <Myselect />
      </div>
    );
  }
}

export default App;
