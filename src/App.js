import './App.css';
import LoginPage from './parts/login/login';
import HomePage from './parts/home/home';
import ShowProduto from "./parts/mostraProduto/showProduto";

function App() {
  return (
    <div className="App">
      <HomePage />
      < ShowProduto  />
    </div>
  );
}

export default App;
