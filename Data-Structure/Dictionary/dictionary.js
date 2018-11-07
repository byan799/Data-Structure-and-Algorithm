function Dictionary() {
	this.dataStore = [];
}

Dictionary.prototype.add = function(key, value) {
	this.dataStore[key] = value;
}

Dictionary.prototype.find = function(key) {
	return this.dataStore[key];
}

Dictionary.prototype.remove = function(key) {
	delete this.dataStore[key];
}

Dictionary.prototype.count = function() {
	let count = 0;
	for (let key in this.dataStore) {
		count++;
	}
	return count;
}

Dictionary.prototype.clear = function() {
	for (let key in this.dataStore) {
		delete this.dataStore[key];
	}
}

Dictionary.prototype.displayAll = function() {
	let keyArr = Object.keys(this.dataStore).sort();
	for (let i in keyArr) {
		let key = keyArr[i];
		console.log(`${key} => ${this.dataStore[key]}`);
	}
}

// test
const dict = new Dictionary();
dict.add('a', 'apple');
dict.add('m', 'money');
dict.add('c', 'chair');
dict.add('h', 'house');
dict.add('b', 'banana');
dict.add('t', 'table');
console.group('--- dict test ---');
dict.displayAll();
console.log(`find "m": ${dict.find('m')}`);
console.log(`find "w": ${dict.find('w')}`);
console.log(dict.count());
dict.remove('h');
dict.displayAll();
console.log(dict.count());
dict.clear();
dict.displayAll();
console.groupEnd('--- dict test ---');

/**
使用Dictionary 类写一个程序，该程序用来存储一段文本中各个单词出现的次数。该程
序显示每个单词出现的次数，但每个单词只显示一次, 单词按字母排序。
*/
function countWords(str) {
	let wordDict = new Dictionary();
	let arr = str.split(' ');
	for (let i = 0; i < arr.length; i++) {
		let word = arr[i];
		if (wordDict.find(word)) {
			wordDict.dataStore[word]++;
		} else {
			wordDict.add(word, 1);
		}
	}
	wordDict.displayAll();
}

console.group('--- wordDict ---');
const wordStr= 'the brown fox jumped over the blue fox';
countWords(wordStr);
console.groupEnd('--- wordDict ---');





















