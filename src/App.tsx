import "./App.css";
import { useCount } from "./useCount";

function InitialLoadingView() {
  return <div>Loading...</div>;
}

function CountView({
  count,
  onClick,
  isLoading,
}: {
  count: number;
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => onClick()}>
        Count!{isLoading && ` Loading...`}
      </button>
    </>
  );
}

function App() {
  const {
    isLoadingInitial,
    isLoadingUpdate,
    error,
    count,
    requestUpdatedCount,
  } = useCount();

  if (error) {
    throw new Error("An error has occured");
  }

  return (
    <div className="App">
      <header>***REMOVED***</header>
      <section>
        {isLoadingInitial ? (
          <InitialLoadingView />
        ) : (
          <CountView
            count={count}
            onClick={requestUpdatedCount}
            isLoading={isLoadingUpdate}
          />
        )}
      </section>
    </div>
  );
}

export default App;
