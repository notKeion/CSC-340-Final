import React, { useEffect, useState, useRef } from 'react';
import { Graph } from '../DataStructures/Graph';

const GraphViewer = () => {
  const [graphData, setGraphData] = useState({ vertices: [], edges: [] });
  const graphRef = useRef(null);
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [shortestPath, setShortestPath] = useState([]);
  const [algoSteps, setAlgoSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const graph = new Graph();
    // Example graph: A-B, B-C, A-C
    graph.addEdge('A', 'B', 1);
    graph.addEdge('B', 'C', 2);
    graph.addEdge('A', 'C', 3);
    graph.addEdge('D', 'B', 3);
    graph.addEdge('D', 'A', 3);
    graph.addEdge('E', 'A', 3);
    graph.addEdge('E', 'D', 3);
    graph.addEdge('F', 'E', 3);
    graph.addEdge('G', 'E', 3);
    graph.addEdge('G', 'D', 1);

    const vertices = graph.getVertices();
    const edges = graph.getEdges();
    setGraphData({ vertices, edges });
    graphRef.current = graph;
    if (vertices.length > 1) {
      setStartNode(vertices[0].value);
      setEndNode(vertices[vertices.length - 1].value);
    }
  }, []);

  useEffect(() => {
    if (isPlaying && currentStep >= 0 && currentStep < algoSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, algoSteps, isPlaying]);

  const runDijkstraVisualization = () => {
    if (!startNode || !endNode) return;
    const graph = graphRef.current;
    const verticesList = graph.getVertices().map(v => v.value);
    const distances = new Map();
    const previous = new Map();
    verticesList.forEach(v => {
      distances.set(v, Infinity);
      previous.set(v, null);
    });
    distances.set(startNode, 0);
    const unvisited = new Set(verticesList);
    const steps = [];

    while (unvisited.size) {
      // pick current with min distance
      let current = null;
      let minDist = Infinity;
      unvisited.forEach(v => {
        const d = distances.get(v);
        if (d < minDist) {
          minDist = d;
          current = v;
        }
      });
      steps.push({ type: 'visit', node: current });
      unvisited.delete(current);

      const currVertex = graph.getVertex(current);
      currVertex.adjacency.forEach((weight, neighbor) => {
        if (unvisited.has(neighbor.value)) {
          const oldDist = distances.get(neighbor.value);
          const alt = distances.get(current) + weight;
          steps.push({
            type: 'relax',
            edge: { source: current, dest: neighbor.value },
            oldDist,
            newDist: alt
          });
          if (alt < oldDist) {
            distances.set(neighbor.value, alt);
            previous.set(neighbor.value, current);
            steps.push({ type: 'update', node: neighbor.value });
          }
        }
      });
    }

    // record final path
    const path = [];
    let c = endNode;
    while (c) {
      path.unshift(c);
      c = previous.get(c);
    }
    steps.push({ type: 'path', path });

    setAlgoSteps(steps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;
  const positions = {};
  graphData.vertices.forEach((v, i) => {
    const angle = (2 * Math.PI * i) / graphData.vertices.length;
    positions[v.value] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  const currentStepData = algoSteps[currentStep] || {};
  const dynamicPath = currentStepData.type === 'path' ? currentStepData.path : [];
  const visitedEdges = new Set();
  algoSteps.slice(0, currentStep + 1).forEach(step => {
    if (step.type === 'relax' && step.edge) {
      const key = [step.edge.source, step.edge.dest].sort().join('-');
      visitedEdges.add(key);
    }
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Graph Viewer</h1>
      <div className="mb-4 flex space-x-2">
        <select
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          className="p-2 border rounded"
        >
          {graphData.vertices.map((v) => (
            <option key={v.value} value={v.value}>
              {v.value}
            </option>
          ))}
        </select>
        <select
          value={endNode}
          onChange={(e) => setEndNode(e.target.value)}
          className="p-2 border rounded"
        >
          {graphData.vertices.map((v) => (
            <option key={v.value} value={v.value}>
              {v.value}
            </option>
          ))}
        </select>
        <button
          onClick={runDijkstraVisualization}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Find Shortest Path
        </button>
      </div>
      <div className="mb-4 flex items-center space-x-4 w-full">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span>
          Step {currentStep + 1}/{algoSteps.length}
        </span>
        <input
          type="range"
          min={0}
          max={Math.max(algoSteps.length - 1, 0)}
          value={currentStep}
          onChange={(e) => {
            setIsPlaying(false);
            setCurrentStep(Number(e.target.value));
          }}
          className="flex-1"
        />
      </div>
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height}>
          {graphData.edges.map((e, idx) => {
            const x1 = positions[e.source].x;
            const y1 = positions[e.source].y;
            const x2 = positions[e.dest].x;
            const y2 = positions[e.dest].y;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            // Highlight edge if it's in the shortest path
            const isPathEdge = dynamicPath.some((node, i) =>
              i < dynamicPath.length - 1 &&
              ((e.source === node && e.dest === dynamicPath[i + 1]) ||
                (e.dest === node && e.source === dynamicPath[i + 1]))
            );
            const isRelaxEdge =
              currentStepData.type === 'relax' &&
              currentStepData.edge &&
              currentStepData.edge.source === e.source &&
              currentStepData.edge.dest === e.dest;
            const edgeKey = [e.source, e.dest].sort().join('-');
            const isVisitedEdge = visitedEdges.has(edgeKey);
            return (
              <g key={idx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    isRelaxEdge ? '#F59E0B' :
                    isPathEdge ? '#EF4444' :
                    isVisitedEdge ? '#FBBF24' :
                    '#9CA3AF'
                  }
                  strokeWidth={
                    isRelaxEdge ? 4 :
                    isPathEdge ? 4 :
                    isVisitedEdge ? 2 :
                    2
                  }
                  className="transition-colors duration-500"
                />
                <text
                  x={midX}
                  y={midY - 10}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-sm fill-current text-gray-800"
                >
                  {e.weight}
                </text>
              </g>
            );
          })}
          {graphData.vertices.map((v) => {
            const isPathNode = dynamicPath.includes(v.value);
            const isVisitNode = currentStepData.type === 'visit' && currentStepData.node === v.value;
            const isUpdateNode = currentStepData.type === 'update' && currentStepData.node === v.value;
            return (
              <g key={v.value}>
                <circle
                  cx={positions[v.value].x}
                  cy={positions[v.value].y}
                  r={20}
                  fill={
                    isVisitNode ? '#BFDBFE' :
                    isUpdateNode ? '#FDE68A' :
                    isPathNode ? '#FECACA' :
                    '#BFDBFE'
                  }
                  stroke={isVisitNode ? '#3B82F6' : isUpdateNode ? '#D97706' : 'none'}
                  strokeWidth={isVisitNode || isUpdateNode ? 3 : 0}
                  className="transition-colors duration-500"
                />
                <text
                  x={positions[v.value].x}
                  y={positions[v.value].y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-blue-800 font-medium"
                >
                  {v.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default GraphViewer;