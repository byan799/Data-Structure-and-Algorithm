let root = null
function BinaryTree() {
	let Node = function(key) {
		this.key = key
		this.left = null;
		this.right = null;
	}
	this.insert = function(key) {
		let newNode = new Node(key)
		if (root === null) {
			root = newNode
		} else {
			insertNode(root, newNode)
		}
	}
	let insertNode = function(node, newNode) {
		if (newNode.key < node.key) {
			if (node.left === null) {
				node.left = newNode
			} else {
				insertNode(node.left, newNode)
			}
		} else {
			if (node.right === null) {
				node.right = newNode
			} else {
				insertNode(node.right, newNode)
			}
		}
	}
}
let nodes = [12, 24, 10, 1, 8, 17, 33, 50]
let binaryTree = new BinaryTree()
nodes.forEach(function(key) {
	binaryTree.insert(key)
})

console.log(root)