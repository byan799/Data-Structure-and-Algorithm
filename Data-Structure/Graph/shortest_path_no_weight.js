function Graph(v) {
    this.vertices = v;
    this.edges = {};
    for (let i = 0; i < this.vertices.length; i++) {
        let item = this.vertices[i];
        this.edges[item] = [];
    }
}

Graph.prototype.addEdge = function(m, n) {
    if (this.vertices.indexOf(m) != -1 && this.vertices.indexOf(n) != -1) {
        this.edges[m].push(n);
    }
}

Graph.prototype.shortestPathWithoutWeight = function(s, d) {
    if (this.vertices.indexOf(s) != -1 && this.vertices.indexOf(d) != -1) {
        let marked = {};
        let queue = [];
        let distance = {};
        let prev = {};
        for (let i = 0; i < this.vertices.length; i++) {
            let item = this.vertices[i];
            marked[item] = false;
            distance[item] = -1;
        }
        marked[s] = true;
        distance[s] = 0;
        queue.push(s);
        while (queue.length > 0) {
            let current = queue.shift();
            for (let i = 0; i < this.edges[current].length; i++) {
                let item = this.edges[current][i];
                if (!marked[item]) {
                    distance[item] = distance[current] + 1;
                    marked[item] = true;
                    prev[item] = current;
                    queue.push(item);
                }
            }
        }
        let recursiveV = d;
        let pathQueue = [];
        while (recursiveV && recursiveV != s) {
            pathQueue.push(recursiveV);
            recursiveV = prev[recursiveV];
        }
        let path = s + ' -> ';
        while (pathQueue.length > 0) {
            if (pathQueue.length > 1) {
                path += pathQueue.pop() + ' -> ';
            } else {
                path += pathQueue.pop();
            }
        }
        console.log('The shortest path from ' + s + ' to '+  d + ': ' + path);
    }
}

const g_1 = new Graph(['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6']);
g_1.addEdge('v0', 'v1');
g_1.addEdge('v0', 'v2');
g_1.addEdge('v0', 'v3');
g_1.addEdge('v1', 'v3');
g_1.addEdge('v1', 'v4');
g_1.addEdge('v2', 'v5');
g_1.addEdge('v3', 'v2');
g_1.addEdge('v3', 'v5');
g_1.addEdge('v3', 'v6');
g_1.addEdge('v4', 'v3');
g_1.addEdge('v4', 'v6');
g_1.addEdge('v6', 'v5');

g_1.shortestPathWithoutWeight('v1', 'v5');
g_1.shortestPathWithoutWeight('v1', 'v2');

