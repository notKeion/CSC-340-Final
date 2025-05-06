
// Vertex.js
export class Vertex {
  constructor(value) {
    this.value = value;
    this.adjacency = new Map(); // neighbor Vertex -> weight
  }

  addNeighbor(vertex, weight = 0) {
    this.adjacency.set(vertex, weight);
  }

  getNeighbors() {
    return Array.from(this.adjacency.keys());
  }

  getWeight(vertex) {
    return this.adjacency.get(vertex);
  }
}