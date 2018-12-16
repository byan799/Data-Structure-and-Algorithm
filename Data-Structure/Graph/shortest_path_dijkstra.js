function Graph(v) {
    this.vertices = v;
    this.edges = {};
    this.vertices.forEach((item) => {
        this.edges[item] = [];
    })
}

Graph.prototype.addEdge = function(m, n, weight) {
    if (this.vertices.indexOf(m) != -1 && this.vertices.indexOf(n) != -1) {
        let obj = {}
        obj.vertice = n;
        obj.weight = weight;
        this.edges[m].push(obj);
    }
}

function PriorityQueue() {
    this.queue = [];
    this.length = function () {
        return this.queue.length;
    }
}

PriorityQueue.prototype.enqueue = function(item, priority) {
    let obj = {};
    obj.vertice = item;
    obj.priority = priority;
    this.queue.push(obj);
}

PriorityQueue.prototype.dequeue = function() {
    if (this.queue.length > 0) {
        let firstPriorityItem = this.queue[0];
        let index = 0;
        for (let i = 1; i < this.queue.length; i++) {
            let current = this.queue[i];
            if (current.priority < firstPriorityItem.priority) {
                firstPriorityItem = current;
                index = i;
            }
        }
        this.queue.splice(index, 1);
        return firstPriorityItem;
    }
}

PriorityQueue.prototype.isEmpty = function() {
    if (this.length() === 0) {
        return true;
    }
    return false;
}

Graph.prototype.dijkstra = function(s, d) {
    let distances = {};
    let prev = {};
    let pq = new PriorityQueue();
    distances[s] = 0;
    pq.enqueue(s, 0);
    this.vertices.forEach(v => {
        if (v != s) {
            distances[v] = Infinity;
        }
        prev[v] = null;
    })  
    while (!pq.isEmpty()) {
        let minItem = pq.dequeue();
        let minV = minItem.vertice;
        this.edges[minV].forEach(node => {
            let dis = distances[minV] + node.weight;
            if (dis < distances[node.vertice]) {
                distances[node.vertice] = dis;
                prev[node.vertice] = minV;
                pq.enqueue(node.vertice, dis);
            }
        })
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
    console.log('The shortest path from ' + s + ' to ' + d + ' :' + path);
}

const g_2 = new Graph(['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6']);
g_2.addEdge('v0', 'v1', 1);
g_2.addEdge('v0', 'v2', 3);
g_2.addEdge('v0', 'v3', 5);
g_2.addEdge('v1', 'v3', 1);
g_2.addEdge('v1', 'v4', 1);
g_2.addEdge('v2', 'v5', 2);
g_2.addEdge('v3', 'v2', 5);
g_2.addEdge('v3', 'v5', 8);
g_2.addEdge('v3', 'v6', 6);
g_2.addEdge('v4', 'v3', 1);
g_2.addEdge('v4', 'v6', 1);
g_2.addEdge('v6', 'v5', 2);

g_2.dijkstra('v1', 'v5');
g_2.dijkstra('v0', 'v6');
