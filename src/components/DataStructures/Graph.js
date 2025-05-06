import { Vertex } from './Vertex';

export class Graph {
  constructor() {
    this.vertices = new Map(); // value -> Vertex
  }

  addVertex(value) {
    if (!this.vertices.has(value)) {
      this.vertices.set(value, new Vertex(value));
    }
    return this.vertices.get(value);
  }

  getVertex(value) {
    return this.vertices.get(value);
  }

  addEdge(sourceValue, destValue, weight = 0, directed = false) {
    const source = this.addVertex(sourceValue);
    const dest = this.addVertex(destValue);

    source.addNeighbor(dest, weight);
    if (!directed) {
      dest.addNeighbor(source, weight);
    }
  }

  getVertices() {
    return Array.from(this.vertices.values());
  }

  getVerticesMap() {
    return this.vertices;
  }

  getEdges() {
    const edges = [];
    this.vertices.forEach((vertex) => {
      vertex.adjacency.forEach((weight, neighbor) => {
        edges.push({ source: vertex.value, dest: neighbor.value, weight });
      });
    });
    return edges;
  }

  /**
   * Prepare for Dijkstra's algorithm.
   * Returns an object with:
   * - distances: Map from vertex value to shortest distance from start
   * - previous:  Map from vertex value to predecessor on the shortest path
   *
   * You can later plug in a priority queue for efficient extraction.
   */
  dijkstra(startValue) {
    const distances = new Map();
    const previous = new Map();
    this.vertices.forEach((vertex, value) => {
      distances.set(value, Infinity);
      previous.set(value, null);
    });

    if (!this.vertices.has(startValue)) {
      throw new Error(`Start vertex "${startValue}" not found in graph.`);
    }
    distances.set(startValue, 0);

    // TODO: Replace this naive loop with a priority queue for efficiency.
    const unvisited = new Set(this.vertices.keys());

    while (unvisited.size) {
      // pick unvisited vertex with smallest distance
      let currentValue = null;
      let smallestDistance = Infinity;
      unvisited.forEach((v) => {
        const d = distances.get(v);
        if (d < smallestDistance) {
          smallestDistance = d;
          currentValue = v;
        }
      });

      unvisited.delete(currentValue);
      const currentVertex = this.getVertex(currentValue);

      currentVertex.adjacency.forEach((weight, neighbor) => {
        if (unvisited.has(neighbor.value)) {
          const alt = distances.get(currentValue) + weight;
          if (alt < distances.get(neighbor.value)) {
            distances.set(neighbor.value, alt);
            previous.set(neighbor.value, currentValue);
          }
        }
      });
    }

    return { distances, previous };
  }
}