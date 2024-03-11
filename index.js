class PQ {
	constructor() {
		this.items = [];
	}

	enqueue(item, priority) {
		this.items.push({ item, priority });
		this.items.sort((a, b) => {
			return a.priority - b.priority;
		});
	}

	dequeue() {
		return this.items.shift();
	}

	isEmpty() {
		return this.items.length === 0;
	}
}

class Graph {
	constructor() {
		this.nodes = new Map();
	}

	addNode(n) {
		this.nodes.set(n, []);
	}

	addEdge(n1, n2, weight) {
		this.nodes.get(n1).push({ node: n2, weight });
		this.nodes.get(n2).push({ node: n1, weight });
	}

	dijkstra(start, end) {
		const distances = new Map();
		const prevNodes = new Map();
		const Q = new PQ();

		for (const node of this.nodes.keys()) {
			distances.set(node, node === start ? 0 : Infinity);
			prevNodes.set(node, null);
			Q.enqueue(node, distances.get(node));
		}

		while (!Q.isEmpty()) {
			const currentNode = Q.dequeue().item;

			if (currentNode === end) {
				const path = [];
				let cur = end;
				while (cur) {
					path.unshift(cur);
					cur = prevNodes.get(cur);
				}
				return path;
			}

			for (const neighbor of this.nodes.get(currentNode)) {
				const newDistance = distances.get(currentNode) + neighbor.weight;

				if (newDistance < distances.get(neighbor.node)) {
					distances.set(neighbor.node, newDistance);
					prevNodes.set(neighbor.node, currentNode);
					Q.enqueue(neighbor.node, newDistance);
				}
			}
		}

		return null;
	}
}

const graph = new Graph();

// graph.addNode('A');
// graph.addNode('B');
// graph.addNode('C');
// graph.addNode('D');
// graph.addNode('E');

// graph.addEdge('A', 'B', 4);
// graph.addEdge('A', 'C', 2);
// graph.addEdge('B', 'E', 3);
// graph.addEdge('C', 'D', 2);
// graph.addEdge('D', 'E', 3);

// const shortestPath = graph.dijkstra('A', 'E');
// console.log(shortestPath);

graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addNode('F');
graph.addNode('G');
graph.addNode('H');
graph.addNode('I');
graph.addNode('J');
graph.addNode('K');
graph.addNode('L');
graph.addNode('S');

graph.addEdge('S', 'A', 7);
graph.addEdge('S', 'B', 2);
graph.addEdge('S', 'C', 3);
graph.addEdge('C', 'L', 2);
graph.addEdge('L', 'I', 4);
graph.addEdge('L', 'J', 4);
graph.addEdge('I', 'J', 6);
graph.addEdge('I', 'K', 4);
graph.addEdge('J', 'K', 4);
graph.addEdge('K', 'E', 5);
graph.addEdge('A', 'B', 3);
graph.addEdge('A', 'D', 4);
graph.addEdge('B', 'D', 4);
graph.addEdge('B', 'H', 1);
graph.addEdge('D', 'F', 5);
graph.addEdge('H', 'F', 3);
graph.addEdge('H', 'G', 2);
graph.addEdge('G', 'E', 2);

const shortestPath = graph.dijkstra('S', 'E');
console.log(shortestPath);
