// app.jsx
import React from 'react';
import GraphViewer from './components/Visual/GraphViewer';
import GraphControls from './components/Visual/GraphControls';

const App = () => (
  <div className="flex flex-col gap-5 min-h-screen bg-gray-50  items-center justify-center">
    <GraphViewer />
    <GraphControls/>
  </div>
);

export default App;