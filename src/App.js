import './App.css';
import Form from "./components/form/Form.js"
import { BrowserRouter } from 'react-router-dom';
import { Switch,Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard.js'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/form" component={Form}></Route>
      <Route exact path="/" component={Dashboard}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
