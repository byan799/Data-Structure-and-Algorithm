function Stack() {
	this.dataStore = [];
	this.top = 0;
	this.push = push;
	this.pop = pop;
	this.peek = peek;
	this.clear = clear;
	this.length = length;
}

function push(element) {
	this.dataStore[this.top++] = element;
}

function pop() {
	this.top--;
	return this.dataStore.pop();
}

function peek() {
	return this.dataStore[this.top - 1];
}

function clear() {
	this.dataStore = [];
	this.top = 0;
}

function length() {
	return this.top;
}

/**
	数制转换, base 2 ~ 9
*/
function transBase(num, base) {
	let s = new Stack();
	let trans = '';
	do {
		s.push(num % base);
		num = Math.floor(num / base);
	} while (num > 0)
	while (s.length() > 0) {
		trans += s.pop();
	}
	return trans;
}

console.group('transBase');
console.log(transBase(32, 2));
console.log(transBase(125, 8));
console.groupEnd('transBase');

/**
	回文 palindrome
*/
function isPalindrome(word) {
	let s = new Stack();
	let rword = '';
	
	for (let i = 0; i < word.length; i++) {
		s.push(word[i]);
	}
	while (s.length() > 0) {
		rword += s.pop();
	}
	// string => array => reverse => string
	// rword = word.split('').reverse().join('');
	if (rword === word) {
		return true;
	} else {
		return false;
	}
}

console.group('palindrome');
console.log(isPalindrome('hello'));
console.log(isPalindrome('racecar'));
console.groupEnd('palindrome');

/**
	模拟递归 -- 阶乘
*/
function factorial(n) {
	let s = new Stack();
	let fact = 1;
	while (n > 1) {
		s.push(n--);
	}
	while (s.length() > 0) {
		fact *= s.pop();
	}
	return fact;
}

/*
function factorial(n) {
	if (n === 0) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}
*/
console.group('factorial');
console.log(factorial(6));
console.groupEnd('factorial');



