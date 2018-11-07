function SLList() {
	this.head = null;
	this.length = 1;
}

function SLLNode(data) {
	this.data = data;
	this.next = null;
}

// add element at the tail of a Single Linked List
SLList.prototype.add = function(element) {
	let node = new SLLNode(element);
	if (!this.head) {
		this.head = node;
	} else {
		let current = this.head;
		while (current.next) {
			current = current.next;
		}
		current.next = node;
		this.length++;
	}
}

SLList.prototype.find = function(element) {
	let current = this.head;
	while (current && current.data != element) {
		current = current.next;
	}
	return current;
}

// insert a new element after an existed element of a Single Linked List
SLList.prototype.insert = function(newElement, element) {
	let node = new SLLNode(newElement);
	let current = this.find(element);
	if (current) {
		node.next = current.next;
		current.next = node;
		this.length++;
		return true;
	}
	return false;
}

SLList.prototype.toString = function() {
	let current = this.head;
	let str = ''
	while (current) {
		str += current.data + ' '
		current = current.next;
	}
	return str.trim();
}

SLList.prototype.findPrevious = function(element) {
	let current = this.head;
	if (current) {
		while (current.next && current.next.data != element) {
			current = current.next;
		}
		if (current.next) {
			return current;
		}
		return false;
	}
	return false;
} 

SLList.prototype.remove = function(element) {
	if (element === this.head.data) {
		if (this.head.next) {
			this.head = this.head.next;
			this.length--;
		} else {
			this.head = null;
			this.length = 1;
		}
		return true;
	} else {
		let previousNode = this.findPrevious(element);
		if (previousNode) {
			previousNode.next = previousNode.next.next;
			this.length--;
			return true;
		}
	}
	return false;
}

function DLList() {
	this.head = null;
	this.length = 1;
}

function DLLNode(data) {
	this.data = data;
	this.previous = null;
	this.next = null;
}

// add element at the tail of a Double Linked List
DLList.prototype.add = function(element) {
	let node = new DLLNode(element);
	if (!this.head) {
		this.head = node;
	} else {
		let current = this.head;
		while (current.next) {
			current = current.next;
		}
		current.next = node;
		node.previous = current;
		this.length++;
	}
}

DLList.prototype.find = function(element) {
	let current = this.head;
	while (current && current.data != element) {
		current = current.next;
	}
	return current;
}

// insert a new element after an existed element of a double linked list
DLList.prototype.insert = function(newElement, element) {
	let node = new DLLNode(newElement);
	let current = this.find(element);
	if (current) {
		if (current.next) {
			node.next = current.next;
			current.next.previous = node;
		}
		current.next = node;
		node.previous = current;
		this.length++;
		return true;
	}
	return false;
}

DLList.prototype.toString = function() {
	let current = this.head;
	let str = '';
	while (current) {
		str += current.data + ' ';
		current = current.next;
	}
	return str.trim();
}

DLList.prototype.remove = function(element) {
	if (element === this.head.data) {
		if (this.head.next) {
			this.head = this.head.next;
			this.head.previous = null;
			this.length--;
		} else {
			this.head = null;
			this.length = 1;
		}
	} else {
		let node = this.find(element);
		if (node.next) {
			node.previous.next = node.next;
			node.next.previous = node.previous;
		} else {
			node.previous.next = null;
		}
		this.length--;
		return true;
	}
	return false;
}

function CLList () {
	this.head = null;
	this.length = 1;
}

function CLLNode(data) {
	this.data = data;
	this.next = null;
	this.isHead = false;
}

// add element at the tail of a cycle linked list
CLList.prototype.add = function(element) {
	let node = new CLLNode(element);
	if (!this.head) {
		node.next = node;
		node.isHead = true;
		this.head = node;
	} else {
		let current = this.head;
		while (!current.next.isHead) {
			current = current.next;
		}
		node.next = this.head;
		current.next = node;
		this.length++;
	}
}

CLList.prototype.find = function(element) {
	if (this.head.data === element) {
		return this.head;
	} else {
		let current = this.head.next;
		while (!current.isHead && current.data != element) {
			current = current.next;
		}
		if (!current.isHead) {
			return current;
		}
	}
	return false;
}


// insert a new element after an existed element of a Cycle Linked List
CLList.prototype.insert = function(newElement, element) {
	let node = new CLLNode(newElement);
	let current = this.find(element);
	if (current) {
		node.next = current.next;
		current.next = node;
		this.length++;
		return true;
	}
	return false;
}

CLList.prototype.toString = function() {
	let current = this.head;
	let str = ''
	if (current) {
		while (!current.next.isHead) {
			str += current.data + ' ';
			current = current.next;
		}
		str += current.data;
	}
	return str.trim();
}

CLList.prototype.findPrevious = function(element) {
	let current = this.head;
	if (current) {
		while (!current.next.isHead && current.next.data != element) {
			current = current.next;
		}
		if (current.next === this.head) {
			if (this.head.data === element) {
				return current;
			} else {
				return false;
			}
		} 
		return current;
	}
	return false;
}

CLList.prototype.remove = function(element) {
	let previousNode = this.findPrevious(element);
	if (previousNode) {
		if (previousNode.next === previousNode) {
			this.head = null;
			this.length = 1;
		} else {
			if (previousNode.next.isHead) {
				previousNode.next = this.head.next;
				this.head = this.head.next;
				this.head.isHead = true;
				this.length--;
			} else {
				previousNode.next = previousNode.next.next;
				this.length--;
			}
		}
		return true;
	}
	return false;
}

// test SLList
const s = new SLList();
for (let i = 0; i < 10; i++) {
	s.add(i);
}
console.group('--- SLList ---');
console.log(s.toString());
s.remove(6);
console.log(s.toString());
s.insert(12, 8);
console.log(s.toString());
s.remove(0);
console.log(s.toString());
s.remove(9);
console.log(s.toString());
console.groupEnd('SLList');

// test DLList
const d = new DLList();
for (let i = 0; i < 10; i++) {
	d.add(i);
}
console.group('--- DLList ---');
console.log(d.toString());
d.remove(5);
console.log(d.toString());
d.remove(0);
console.log(d.toString());
d.insert(14, 6);
console.log(d.toString());
d.remove(9);
console.log(d.toString());
console.groupEnd('--- DLList ---');

// test CLList
const c = new CLList();
for (let i = 0; i < 10; i++) {
	c.add(i);
}
console.group('--- CLList ---');
console.log(c.toString());
c.remove(3);
console.log(c.toString());
c.remove(0);
console.log(c.toString());
c.remove(9);
console.log(c.toString());
c.insert(24, 5);
console.log(c.toString());
c.insert(28, 8);
console.log(c.toString());
console.groupEnd('--- CLList ---');

/**
传说在公元1 世纪的犹太战争中，犹太历史学家弗拉维奥·约瑟夫斯和他的40 个同胞
被罗马士兵包围。犹太士兵决定宁可自杀也不做俘虏，于是商量出了一个自杀方案。他
们围成一个圈，从一个人开始，数到第三个人时将第三个人杀死，然后再数，直到杀光
所有人。约瑟夫和另外一个人决定不参加这个疯狂的游戏，他们快速地计算出了两个位
置，站在那里得以幸存。写一段程序将n 个人围成一圈，并且第m 个人会被杀掉，计算
一圈人中哪两个人最后会存活。使用循环链表解决该问题。
*/
/**
@params {Number} n, 双向列表元素个数
@params {Number} m, 循环第几个被删除
*/
function survivor(n, m) {
	if (m > 1) {
		let circle = new CLList();
		for (let i = 1; i <= n; i++) {
			circle.add(i);
		}
		console.log(circle.toString());
		let current = circle.head;
		while (circle.length >= m) {
			let temp = current;
			for (let j = 1; j <= m; j++) {
				temp = current;
				current = current.next;
			}
			console.log(`remove: ${temp.data}`);
			circle.remove(temp.data);
		}
		console.log(circle.toString());
	} else {
		console.log('no survivors!');
	}
}
console.group('--- survivor ---');
survivor(40, 3);
console.groupEnd('--- survivor ---');














