import React, { useEffect, useState } from 'react';
import { Graph } from '../DataStructures/Graph';

const GraphViewer = () => {
  const [graphData, setGraphData] = useState({ vertices: [], edges: [] });

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

    const vertices = graph.getVertices();
    const edges = graph.getEdges();
    setGraphData({ vertices, edges });
  }, []);

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

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Graph Viewer</h1>
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height}>
          {graphData.edges.map((e, idx) => {
            const x1 = positions[e.source].x;
            const y1 = positions[e.source].y;
            const x2 = positions[e.dest].x;
            const y2 = positions[e.dest].y;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            return (
              <g key={idx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="black"
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
          {graphData.vertices.map((v) => (
            <g key={v.value}>
              <circle
                cx={positions[v.value].x}
                cy={positions[v.value].y}
                r={20}
                fill="#BFDBFE"
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
          ))}
        </svg>
      </div>
    </div>
  );
};

export default GraphViewer;