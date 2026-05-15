import { useState } from 'react';
import EngineDiagram from './components/EngineDiagram';
import StrokeSelector from './components/StrokeSelector';
import InfoPanel from './components/InfoPanel';
import { strokes } from './data/strokes';
import './App.css';

function App() {
  const [activeStroke, setActiveStroke] = useState(0);

  return (
      <div className="app">
        <header>
          <h1>How the heck a four-stroke engine works</h1>
          <p>Click through the buttons to get an education</p>
        </header>

        <main>
          <EngineDiagram stroke={strokes[activeStroke]} strokeIndex={activeStroke} />
          <StrokeSelector strokes={strokes} activeIndex={activeStroke} onSelect={setActiveStroke} />
          <InfoPanel stroke={strokes[activeStroke]} />
        </main>
      </div>
    )
}

export default App;