/**
 exercises in the book - "A&D with Javascript" 
*/
function List () {
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = [];
	this.length = length; // function
	this.clear = clear; 
	this.find = find; // return index of the element, otherwise return -1
	this.toString = toString; // return list data (array)
	this.getElement = getElement; // get current element (pos)
	this.insert = insert; // insert a element after a certain element
	this.append = append; // append new element at list tail
	this.remove = remove; // remove a certain element, return true/false
	this.front = front; // move the pos to the first position
	this.end = end; // move the pos to the last position
	this.prev = prev; // move the pos to the previous position
	this.next = next; // move the pos to the next position
	this.currPos = currPos; // get the current position
	this.moveTo = moveTo; // move the current pos to a given position
	this.contains = contains;
	this.hasNext = hasNext;
	this.hasPrev = hasPrev;
}

function length () {
	return this.listSize;
}
function clear () {
	this.dataStore = [];
	this.listSize = 0;
	this.pos = 0;
}
// check if a certain element in the list, return the index, otherwise return -1
function find (element) {
	for (let i = 0; i < this.listSize; i++) {
		if (this.dataStore[i] == element) {
			return i;
		}
	}
	return -1;
}
// return list data (array)
function toString () {
	return this.dataStore;
}
// get current element
function getElement () {
	return this.dataStore[this.pos];
}
// insert element after a certion element
function insert (element, after) {
	let pos = this.find(after);
	if (pos > -1) {
		this.listSize++;
		this.dataStore.splice(pos + 1, 0, element);
		/*
		for (i = this.listSize - 1; i > pos + 1; i--) {
			this.dataStore[i] = this.dataStore[i - 1];
		}
		this.dataStore[pos + 1] = element;
		*/
		return true;
	}
	return false;
}
// insert element in the list tail
function append (element) {
	this.dataStore[this.listSize++] = element;
}
// remove an element
function remove (element) {
	let pos = this.find(element);
	if (pos > -1) {
		this.dataStore.splice(pos, 1);
		this.listSize--;
		return true;
	}
	return false;
}
// move the pos to the first position
function front () {
	this.pos = 0;
}
// move the pos to the end position
function end () {
	this.pos = this.listSize - 1;
}
function prev () {
	if (this.pos > 0) {
		this.pos--;
		return true;
	}
	return false;
}
function next () {
	if (this.pos < this.listSize - 1) {
		this.pos++;
		return true;
	}
	return false;
}
function currPos () {
	return this.pos;
}
function moveTo (position) {
	if (position >= 0 && position <= this.listSize - 1) {
		this.pos = position;
		return true;
	}
	return false;
}
function contains (element) {
	let pos = this.find(element);
	if (pos > -1) {
		return true;
	}
	return false;
}
function hasNext () {
	return this.pos < this.listSize - 1;
}
function hasPrev () {
	return this.pos > 0;
}

/**
1. 增加一个向列表中插入元素的方法，该方法只在待插元素大于列表中的所有元素时才执
行插入操作。这里的大于有多重含义，对于数字，它是指数值上的大小；对于字母，它
是指在字母表中出现的先后顺序。
*/
function appendBiggerElement(ele) {
	if (!Number.isNaN(ele)) {
		if (this.dataStore.every(item => {
			return ele > item;
		})) {
			this.append(ele);
			return true;
		}
	} else if (ele.match(/^[a-zA-Z]$/)) {
		if (this.dataStore.every(item => {
			return ele > item;
		})) {
			this.append(ele);
			return true;
		}
	}
	return false;
}

var listCompareNum = new List();
listCompareNum.appendBiggerElement = appendBiggerElement;
listCompareNum.append(1);
listCompareNum.append(5);
listCompareNum.append(23);
console.group('1')
console.log(listCompareNum.appendBiggerElement(12));
console.log(listCompareNum.appendBiggerElement(25));

var listCompareLetter = new List();
listCompareLetter.appendBiggerElement = appendBiggerElement;
listCompareLetter.append('a');
listCompareLetter.append('k');
listCompareLetter.append('t');
console.log(listCompareLetter.appendBiggerElement('h'));
console.log(listCompareLetter.appendBiggerElement('w'));
console.groupEnd('1')

/**
2. 增加一个向列表中插入元素的方法，该方法只在待插元素小于列表中的所有元素时才执
行插入操作。
*/
function appendSmallerElement(ele) {
	if (!Number.isNaN(ele)) {
		if (this.dataStore.every(item => {
			return ele < item;
		})) {
			this.append(ele);
			return true;
		}
	} else if (ele.match(/^[a-zA-Z]$/)) {
		if (this.dataStore.every(item => {
			return ele < itme;
		})) {
			this.append(ele);
			return true;
		}
	}
	return false;
}

var listCompareNum_2 = new List();
listCompareNum_2.appendSmallerElement = appendSmallerElement;
listCompareNum_2.append(12);
listCompareNum_2.append(24);
listCompareNum_2.append(25);
listCompareNum_2.append(68);
console.group('2');
console.log(listCompareNum_2.appendSmallerElement(45));
console.log(listCompareNum_2.appendSmallerElement(10));

var listCompareLetter_2 = new List();
listCompareLetter_2.appendSmallerElement = appendSmallerElement;
listCompareLetter_2.append('m');
listCompareLetter_2.append('q');
listCompareLetter_2.append('t');
console.log(listCompareLetter_2.appendSmallerElement('w'));
console.log(listCompareLetter_2.appendSmallerElement('c'));
console.groupEnd('2');

/**
3. 创建Person 类，该类用于保存人的姓名和性别信息。创建一个至少包含10 个Person 对
象的列表。写一个函数显示列表中所有拥有相同性别的人。
*/
function Person(name, gender) {
	this.name = name;
	this.gender = gender;
}

var personList = new List();
for (let i = 0; i < 10; i++) {
	let name = 'p_' + i;
	let gender = i % 2 === 0 ? 'male' : 'female';
	let p = new Person(name, gender);
	personList.append(p);
}
console.group('3');
function getSameGender(gender) {
	for (let i = 0; i < this.length(); i++) {
		if (this.dataStore[i].gender == gender) {
			console.log(this.dataStore[i]);
		}
	}
}
personList.getSameGender = getSameGender;
personList.getSameGender('male');
personList.getSameGender('female');
console.groupEnd('3');

/**
4. 设计一个影碟租赁程序，当一部影片检出后，将其加入一个已租影片列表。每当有客
户检出一部影片，都显示该列表中的内容
*/
var movieList = new List();
for (let i = 0; i < 100; i++) {
	movieList.append('movie_' + i);
}
movieList.movieRentOut = new List();
movieList.rent = function(movie) {
	if (this.contains(movie)) {
		let pos = this.find(movie);
		this.remove(movie);
		this.movieRentOut.append(movie);
		console.log(this.movieRentOut.dataStore);
		return true;
	}
	return false;
}
console.group('4')
console.log(movieList.rent('movie_101'));
console.log(movieList.rent('movie_20'));
console.groupEnd('4');

/**
5. 为影碟租赁程序创建一个check-in() 函数，当客户归还一部影片时，将该影片从已租列
表中删除，同时添加到现有影片列表中。
*/
movieList.checkIn = function(movie) {
	this.movieRentOut.remove(movie);
	this.append(movie);
}
console.group('5');
movieList.checkIn('movie_20');
console.log(movieList.dataStore);
console.log(movieList.movieRentOut.dataStore);
console.groupEnd('5');




