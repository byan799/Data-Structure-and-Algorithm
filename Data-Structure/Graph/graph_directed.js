function Graph(v) {
    this.vertices = v;
    this.edges = {};
    this.marked = {};
    this.firstIn = {};
    for (let i = 0; i < this.vertices.length; i++) {
        let item = this.vertices[i];
        this.edges[item] = [];
        this.firstIn[item] = 0;
        this.marked[item] = false;
    }
}

Graph.prototype.addEdge = function(m, n) {
    if (this.vertices.indexOf(m) != -1 && this.vertices.indexOf(n) != -1) {
        this.edges[m].push(n);
        this.firstIn[n]++;
    }
}

Graph.prototype.sortShow = function() {
    let queue = [];
    for (let key in this.firstIn) {
        if (this.firstIn[key] === 0) {
            queue.push(key);
        }
    }
    while (queue.length > 0) {
        let current = queue.shift();
        this.marked[current] = true;
        console.log(current);
        for (let i = 0; i < this.edges[current].length; i++) {
            let item = this.edges[current][i];
            if (!this.marked[item]) {
                this.firstIn[item]--;
                if (this.firstIn[item] === 0) {
                    queue.push(item);
                }
            }
        }
    }
}

Graph.prototype.setInit = function() {
    for (let i = 0; i < this.vertices.length; i++) {
        let item = this.vertices[i];
        this.marked[item] = false;
        this.firstIn[item] = 0;
    }
}

const v_2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const g_2 = new Graph(v_2);
g_2.addEdge('a', 'b');
g_2.addEdge('b', 'c');
g_2.addEdge('b', 'd');
g_2.addEdge('c', 'e');
g_2.addEdge('d', 'f');
g_2.addEdge('e', 'g');
g_2.addEdge('f', 'g');

g_2.sortShow();