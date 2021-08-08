import './App.scss';
import Todos from './components/todos';

function App() {
  return (
    <div className="App">
      <div className="todo-app">
        <div className="todo-app__todos">
          <Todos />
        </div>
      </div>
    </div>
  );
}

export default App;
