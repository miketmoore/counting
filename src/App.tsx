import "./App.css";
import { useCount } from "./useCount";

function App() {
  const { count, requestUpdatedCount } = useCount();

  return (
    <div className="App">
      <header>***REMOVED***</header>
      <section>
        <div>Count: {count}</div>
        <button onClick={() => requestUpdatedCount()}>Count!</button>
      </section>
    </div>
  );
}

export default App;
