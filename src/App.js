// Purpose: Main App component that renders the Header and Event components.
import './App.css';
import Header from './Components/Header';
import Event from "./Components/Event";

function App() {

  return (
    <div className="App">
      <Header />
      <Event />
    </div>
  );
}

export default App;
