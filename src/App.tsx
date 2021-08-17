import "./App.css";
import { useCount } from "./useCount";

function LoadingView() {
  return <div>Loading...</div>;
}

function CountView({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => onClick()}>Count!</button>
    </>
  );
}

function App() {
  const { isLoading, error, count, requestUpdatedCount } = useCount();

  if (error) {
    throw new Error("An error has occured");
  }

  return (
    <div className="App">
      <header>***REMOVED***</header>
      <section>
        {isLoading ? (
          <LoadingView />
        ) : (
          <CountView count={count} onClick={requestUpdatedCount} />
        )}
      </section>
    </div>
  );
}

export default App;
