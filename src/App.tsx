import './App.css';
import { useCallback, useEffect, useState } from 'react';
import countapi from 'countapi-js'

function App() {

  const [requestEnabled, setRequestEnabled] = useState(false)
  const [count, setCount] = useState<number | null>(null)

  const sendRequest = useCallback(async () => {
    try {
      const {value} = await countapi.visits()
      setCount(value)
    } catch (e) {
      throw e
    }
  }, [setCount])

  useEffect(() => {
    if (requestEnabled) {
      setRequestEnabled(false)
      sendRequest()
    }
  }, [requestEnabled, setRequestEnabled, sendRequest])

  return (
    <div className="App">
      <header>***REMOVED***</header>
      <section>
        <div>
          Count: {count}
        </div>
        <button onClick={() => setRequestEnabled(true)}>Count!</button>
      </section>
    </div>
  );
}

export default App;
