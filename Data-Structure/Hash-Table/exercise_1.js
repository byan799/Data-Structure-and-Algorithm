// hash function
function hash(str, arr) {
	const P = 37;
	let total = 0;
	for (let i = 0; i < str.length; i++) {
		total += P * total + str.charCodeAt(i);
	}
	return total % arr.length;
}

/**
开链法
构造一个二维数组
*/
function HashTableSeperateChaining(num) {
	this.table = new Array(num);
	this.hash = hash;
	for (let i = 0; i < this.table.length; i++) {
		this.table[i] = new Array();
	}
}

HashTableSeperateChaining.prototype.put = function(key, value) {
	let pos = this.hash(key, this.table);
	let i = 0;
	while (this.table[pos][i] != key && this.table[pos][i] != undefined) {
		i += 2;
	}
	this.table[pos][i] = key;
	this.table[pos][i + 1] = value;
}

HashTableSeperateChaining.prototype.get = function(key) {
	let pos = this.hash(key, this.table);
	let i = 0;
	while (this.table[pos][i] != key && this.table[pos][i] != undefined) {
		i += 2;
	}
	if (this.table[pos][i] === key) {
		return this.table[pos][i + 1];
	}
	return undefined;
}

HashTableSeperateChaining.prototype.display = function() {
	for (let i = 0; i < this.table.length; i++) {
		if (this.table[i].length > 0) {
			for (let j = 0; j < this.table[i].length; j = j + 2) {
				console.log(`${this.table[i][j]} => ${this.table[i][j + 1]}`);
			}
		}
	}
}

/**
线性探测（开放寻址散列）
*/
function HashTableOpenAddressing(num) {
	this.table = new Array(num);
	this.values = new Array();
	this.hash = hash;
}

HashTableOpenAddressing.prototype.put = function(key, value) {
	console.log(key);
	console.log(value);
	let pos = this.hash(key, this.table);
	while (this.table[pos] != undefined && this.table[pos] != key) {
		pos++;
	}
	this.table[pos] = key;
	this.values[pos] = value;
}

HashTableOpenAddressing.prototype.get = function(key) {
	let pos = this.hash(key, this.table);
	while (this.table[pos] != undefined && this.table[pos] != key) {
		pos++;
	}
	if (this.table[pos] === key) {
		return this.values[pos];
	}
	return undefined;
}

HashTableOpenAddressing.prototype.display = function() {
	for (let i = 0; i < this.table.length; i++) {
		if (this.table[i] != undefined) {
			console.log(`${this.table[i]} => ${this.values[i]}`);
		}
	}
}

/**
分别使用线性探测法和开链法创建一个字典，用来保存单词的定义。
*/
const dict = []
dict['apple'] = 'a kind of fruit';
dict['pecil'] = 'a tool for writing and drawing';
dict['monitor'] = 'an electronics to display';
dict['motorbike'] = 'a transportation tool';
var openAddressingTable = new HashTableOpenAddressing(13);
for (let key in dict) {
	openAddressingTable.put(key, dict[key]);
}
openAddressingTable.display();
console.log('=========');
var seperateChainingTable = new HashTableSeperateChaining(13);
for (let key in dict) {
	seperateChainingTable.put(key, dict[key]);
}
seperateChainingTable.display();










