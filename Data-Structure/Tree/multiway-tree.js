function Node(id, data) {
	this.id = id;
	this.data = data;
	this.children = [];
}

Node.prototype.showId = function() {
	console.log(this.id);
}

function MultiWayTree() {
	this.root = null;
}

MultiWayTree.prototype.insert = function(id, data, upstreamId) {
	let node = new Node(id, data);
	if (this.root === null) {
		this.root = node;
	} else {
		let upstreamNode = this.find(upstreamId);
		if (upstreamNode) {
			upstreamNode.children.push(node);
		}
	}
}

/**
  recursive the multi-way tree and store nodes in an array
*/
MultiWayTree.prototype.find = function(id) {
	let nodeArr = [];
	let node = this.root;
	this.getNode(node, nodeArr);
	for (let i = 0; i < nodeArr.length; i++) {
		if (nodeArr[i].id === id) {
			return nodeArr[i];
		}
	}
}

MultiWayTree.prototype.getNode = function(node, arr) {
	if (node != null) {
		arr.push(node);
		for (let i = 0; i < node.children.length; i++) {
			this.getNode(node.children[i], arr);
		}
	}
}

MultiWayTree.prototype.remove = function(node, id) {
	if (node != null) {
		for (let i = 0; i < node.children.length; i++) {
			if (node.children[i].id === id) {
				node.children.splice(i, 1);
			} else {
				this.remove(node.children[i], id);
			}
		}
	}
}

MultiWayTree.prototype.show = function(node) {
	if (node != null) {
		node.showId();
		for (let i = 0; i < node.children.length; i++) {
			this.show(node.children[i]);
		}
	}
}

console.group('multi-tree');
let multiTree = new MultiWayTree();
multiTree.insert(1, 1);
multiTree.insert(2, 2, 1);
multiTree.insert(3, 3, 1);
multiTree.insert(4, 4, 1);
multiTree.insert(5, 5, 2);
multiTree.insert(6, 6, 2);
multiTree.insert(7, 7, 3);
multiTree.insert(8, 8, 4);
multiTree.insert(9, 9, 4);
multiTree.insert(10, 10, 4);
multiTree.show(multiTree.root);
console.log(multiTree.find(10));
multiTree.remove(multiTree.root, 10);
multiTree.show(multiTree.root);
multiTree.insert(11, 11, 9);
multiTree.insert(12, 12, 9);
multiTree.insert(13, 13, 12);
multiTree.show(multiTree.root);
multiTree.remove(multiTree.root, 11);
multiTree.show(multiTree.root);
multiTree.remove(multiTree.root, 13);
multiTree.show(multiTree.root);
console.groupEnd('multi-tree');
 


