// app.jsx
import React from 'react';
import GraphViewer from './components/Visual/GraphViewer';
import GraphControls from './components/Visual/GraphControls';
import Footer from './components/Visual/Footer';

const App = () => (
  <div className="flex flex-col gap-5 min-h-screen bg-gray-50  items-center justify-center pb-[200px]">
    <GraphViewer />
    <Footer />
  </div>
);

export default App;