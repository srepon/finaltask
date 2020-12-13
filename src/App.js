import React, {useState} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Customers from './components/Customers';
import Trainings from './components/Trainings';

const App = () => {
   
  const [value, setValue] = useState('one');
 
  const handleChange = (event, value) => {
      setValue(value);
  }

  return(
    <div>
      <AppBar position="static">
        <Tabs 
          value={value} 
          onChange={handleChange}>
           <Tab value="one"
           label="Customers"/>
           <Tab value="two"
           label="Trainings"/>
           <Tab value="three"
           label="Calendar"/>
        </ Tabs>
      </ AppBar>

      {value === 'one' && <Customers />}
      {value === 'two' && <Trainings />}
      {value === 'three' && <h1>En tee tätä :)</h1>}
    </div>
  );
}

export default App;

