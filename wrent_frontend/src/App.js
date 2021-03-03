import logo from './Wrent.png';
import './App.css';
import '../src/components/auth/SignIn';
import '../src/components/auth/SignUp';
import '../src/components/auth/ForgotPassWord';

function App() {
  return (<div className="App" >
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
                      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
                      </a>
    </header>
  </div>
  );
  {/*<header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <p>
                        Edit <code>src/App.js</code> and save to reload.
                      </p>
                      <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn React
                      </a>
            </header>*/
  }

}

export default App;