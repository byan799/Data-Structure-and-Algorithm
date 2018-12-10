function Graph(v) {
	this.vertices = v;
	this.edges = 0;
	this.adj = [];
	this.marked = [];
	for (let i = 0; i < this.vertices.length; i++) {
		let item = this.vertices[i];
		this.adj[item] = [];
		this.marked[item] = false;
	}
}

Graph.prototype.addEdge = function(m, n) {
	if (this.vertices.indexOf(m) != -1 && this.vertices.indexOf(n) != -1) {
		this.adj[m].push(n);
		this.adj[n].push(m);
		this.edges++;
	}
}

Graph.prototype.showGraph = function() {
	for (let i = 0; i < this.vertices.length; i++) {
		let item = this.vertices[i];
		let str = item + ' => ';
		for (let j = 0; j < this.adj[item].length; j++) {
			str += this.adj[item][j] + ' ';
		}
		console.log(str);
	}
}

Graph.prototype.dfs = function(v) {
	this.marked[v] = true;
	if (this.vertices.indexOf(v) != -1) {
		console.log('Visited: ' + v);
	}
	for (let i = 0; i < this.adj[v].length; i++) {
		let w = this.adj[v][i];
		if (!this.marked[w]) {
			this.dfs(w);
		}
	}
}

Graph.prototype.bfs = function(v) {
	let queue = [];
	queue.push(v);
	while (queue.length > 0) {
		let item = queue.shift();
		if (this.vertices.indexOf(item) != -1) {
			if (!this.marked[item]) {
				this.marked[item] = true;
				console.log('Visited: ' + item);
			}
			for (let i = 0; i < this.adj[item].length; i++) {
				let w = this.adj[item][i];
				if (!this.marked[w]) {
					queue.push(w);
				}
			}
		}
	}
}

Graph.prototype.setMarkedInit = function() {
	if (this.marked.every(item => {
		return item === true
	})) {
		for (let key in this.marked) {
			this.marked[key] = false;
		}
	}
}

const v_1 = ['a', 'b', 'c', 'd', 'e'];
const g_1 = new Graph(v_1);
g_1.addEdge('a', 'b');
g_1.addEdge('a', 'c');
g_1.addEdge('a', 'e');
g_1.addEdge('b', 'c');
g_1.addEdge('b', 'd');
g_1.addEdge('c', 'd');
g_1.addEdge('d', 'e');
g_1.showGraph();
console.log('--- Deep First Search ---');
g_1.dfs('a');
console.log('--- Breadth First Search ---');
g_1.setMarkedInit();
g_1.bfs('a');
