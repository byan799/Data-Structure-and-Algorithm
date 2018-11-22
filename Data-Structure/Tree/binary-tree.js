function Node(data) {
	this.data = data;
	this.left = null;
	this.right = null;
}

Node.prototype.show = function() {
	console.log(this.data);
}

function BinaryTree() {
	this.root = null;
}

BinaryTree.prototype.insert = function(data) {
	if (!this.find(data)) {
		let node = new Node(data);
		if (this.root === null) {
			this.root = node;
		} else {
			this.insertNode(this.root, node)
		}
	}	
}

BinaryTree.prototype.insertNode = function(root, node) {
	if (node.data < root.data) {
		if (root.left === null) {
			root.left = node;
		} else {
			this.insertNode(root.left, node);
		}
	} else {
		if (root.right === null) {
			root.right = node;
		} else {
			this.insertNode(root.right, node);
		}
	}
}

BinaryTree.prototype.inOrder = function(node) {
	if (node != null) {
		this.inOrder(node.left);
		node.show();
		this.inOrder(node.right);
	}
}

BinaryTree.prototype.preOrder = function(node) {
	if (node != null) {
		node.show();
		this.preOrder(node.left);
		this.preOrder(node.right);
	}
}

BinaryTree.prototype.postOrder = function(node) {
	if (node != null) {
		this.postOrder(node.left);
		this.postOrder(node.right);
		node.show();
	}
}

BinaryTree.prototype.getMin = function(node) {
	let currentNode = node;
	while (currentNode.left != null) {
		currentNode = currentNode.left;
	}
	return currentNode;
}

BinaryTree.prototype.getMax = function(node) {
	let currentNode = node;
	while (currentNode.right != null) {
		currentNode = currentNode.right;
	}
	return currentNode;
}

BinaryTree.prototype.find = function(data) {
	let node = this.root;
	while (node != null) {
		if (node.data === data) {
			return node;
		} else if (data < node.data) {
			node = node.left;
		} else {
			node = node.right;
		}
	}
	return null;
}

BinaryTree.prototype.remove = function(data) {
	this.root = this.removeNode(this.root, data);
}

BinaryTree.prototype.removeNode = function(node, data) {
	if (node === null) {
		return null;
	} else if (node.data === data) {
		if (node.left === null && node.right === null) {
			node = null;
			return node;
		} else if (node.left === null) {
			node = node.right;
			return node;
		} else if (node.right === null){
			node = node.left;
			return node;
		} else {
			let minNode = this.getMin(node.right);
			node.data = minNode.data;
			node.right = this.removeNode(node.right, minNode.data);
			return node;
		}
	} else if (data < node.data) {
		node.left = this.removeNode(node.left, data);
		return node;		
	} else {
		node.right = this.removeNode(node.right, data);
		return node;
	}
}

const nodeArr = [23, 45, 16, 37, 3, 99, 22];
let bt_1 = new BinaryTree();
nodeArr.forEach(element => {
	bt_1.insert(element);
})

console.group('inOrder');
bt_1.inOrder(bt_1.root);
console.groupEnd('inOrder');

console.group('preOrder');
bt_1.preOrder(bt_1.root);
console.groupEnd('preOrder');

console.group('postOrder');
bt_1.postOrder(bt_1.root);
console.groupEnd('postOrder');

console.group('getMin');
console.log(bt_1.getMin(bt_1.root));
console.groupEnd('getMin');

console.group('getMax');
console.log(bt_1.getMax(bt_1.root));
console.groupEnd('getMax');

console.group('find');
console.log(bt_1.find(16));
console.log(bt_1.find(99));
console.log(bt_1.find(100));
console.groupEnd('find');

console.group('remove')
console.log('before:')
bt_1.inOrder(bt_1.root);
console.log('after:');
bt_1.remove(45);
bt_1.inOrder(bt_1.root);
console.groupEnd('remove');

function inheritPrototype(superType, subType) {
	let prototype = Object.create(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

function NodeCount(data) {
	this.count = 1;
	Node.call(this, data);
}

inheritPrototype(Node, NodeCount);

NodeCount.prototype.show = function() {
	console.log(this.data + ': ' + this.count);
}

function BinaryTreeCount() {
	this.totalCount = 0;
	BinaryTree.call(this);
}

inheritPrototype(BinaryTree, BinaryTreeCount);

BinaryTreeCount.prototype.insert = function(data) {
	if (this.find(data)) {
		this.update(data);
	} else {
		let node = new NodeCount(data);
		if (this.root === null) {
			this.root = node;
			this.totalCount++;
		} else {
			this.insertNode(this.root, node);
		}
	}
}

BinaryTreeCount.prototype.insertNode = function(root, node) {
	if (node.data < root.data) {
		if (root.left === null) {
			root.left = node;
			this.totalCount++;
		} else {
			this.insertNode(root.left, node);
		}
	} else {
		if (root.right === null) {
			root.right = node;
			this.totalCount++;
		} else {
			this.insertNode(root.right, node);
		}
	}
}

BinaryTreeCount.prototype.update = function(data) {
	let node = this.find(data)
	if (node) {
		node.count++;
	} else {
		this.insert(data);
	}
}

console.group('count binary tree');
const arr_2 = [22, 35, 12, 33, 56, 78, 90];
let bt_2 = new BinaryTreeCount();
arr_2.forEach(item => {
	bt_2.insert(item);
})
bt_2.inOrder(bt_2.root);
console.log('update');
bt_2.insert(22);
bt_2.insert(12);
bt_2.insert(56);
bt_2.insert(12);
bt_2.update(56);
bt_2.inOrder(bt_2.root);
console.log('node count: ' + bt_2.totalCount);
console.groupEnd('count binary tree');





























