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
1. 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算
术表达式作为参数，返回括号缺失的位置。下面是一个括号不匹配的算术表达式的例
子：2.3 + 23 / 12 + (3.14159×0.24。
*/
function isParentheseMatch(exp) {
	let s = new Stack();
	for (let i = 0; i < exp.length; i++) {
		if (exp[i] === '(') {
			s.push(exp[i]);
		} else if (exp[i] === ')') {
			if (s.length() > 0) {
				s.pop();
			} else {
				return false;
			}
		}
	}
	return s.length() === 0 ? true : false;
}

console.group('isParentheseMatch');
console.log(isParentheseMatch('(1.5 + 22) * 2'));
console.log(isParentheseMatch('2 + 22 - (1 + 2) * 3)'));
console.groupEnd('isParentheseMatch');

/**
2. 一个算术表达式的后缀表达式形式如下：
op1 op2 operator
设计并实现一个JavaScript 函数，该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值。
*/

// Assumming the expression only includes "+", "-", "*", "/", "(", ")" and number (integer or float)

/**
step 1: expression string => array
*/
function expStrToArr(str) {
	let arr = [];
	str = str.replace(/\s/g, '');
	for (let i = 0; i < str.length; i++) {
		if (str[i] != '+' && str[i] != '-' && str[i] != '*' && str[i] != '/' && str[i] != '(' && str[i] != ')') {
			let sub = str[i];
			let j = i + 1;
			while (str[j] != '+' && str[j] != '-' && str[j] != '*' && str[j] != '/' && str[j] != '(' && str[j] != ')' && j < str.length - 1) {
				sub += str[j++];
			}
			arr.push(sub);
			i = j - 1;
		} else {
			arr.push(str[i]);
		}
	}
	return arr;
}

console.group('expToArr');
console.log(expStrToArr('(22 + 3 - 1) * 2 + 1'));
console.groupEnd('expToArr');

/**
step 2: infix expression => suffix expression
	1) 遇到操作数，直接输出
	2）若栈为空，遇到操作符，直接入栈
	3）若栈不为空，遇到操作符，将优先级高于或等于它的操作符出栈，再将该操作符入栈
	4）遇到左括号“（”，入栈
	5）遇到右括号“）”，执行出栈操作，直到遇到左括号“（”，括号本身不入栈
	6）最后将栈内所有元素依次出栈
*/

function infixToSuffix(infixArr) {
	let s = new Stack();
	let suffixArr = [];
	for (let i = 0; i < infixArr.length; i++) {
		if (infixArr[i] != '+' && infixArr[i] != '-' && infixArr[i] != '*' && infixArr[i] != '/' && infixArr[i] != '(' && infixArr[i] != ')')	{
			suffixArr.push(infixArr[i]);
		} else {
			if (s.length() === 0) {
				s.push(infixArr[i])
			} else {
				if (infixArr[i] === '+' || infixArr[i] === '-') {
					while (s.length() > 0 && s.peek() != '(') {
						suffixArr.push(s.pop());
					}
					s.push(infixArr[i]);
				} else if (infixArr[i] === '*' || infixArr[i] === '/') {
					while (s.length() > 0 && s.peek() != '(' && s.peek() != '+' && s.peek() != '-') {
						suffixArr.push(s.pop());
					}
					s.push(infixArr[i]);
				} else if (infixArr[i] === '(') {
					s.push(infixArr[i]);
				} else if (infixArr[i] === ')') {		
					while (s.length() > 0 && s.peek() != '(') {
						suffixArr.push(s.pop());
					}
					if (s.peek() === '(') {
						s.pop();
					}
				}
			}
		}
	}
	while (s.length() > 0) {
		suffixArr.push(s.pop());
	}
	return suffixArr;
}

console.group('infixToSuffix');
let expArr_1 = expStrToArr('(3+4)*5-6');
let expArr_1_suffix = infixToSuffix(expArr_1);
console.log(expArr_1);
console.log(expArr_1_suffix);
let exp_2 = '(1.5 + 22) * 2';
let expArr_2 = expStrToArr(exp_2);
let expArr_2_suffix = infixToSuffix(expArr_2);
console.log(expArr_2);
console.log(expArr_2_suffix);
let exp_3 = '(22 + 3 - 1) * 2 + 1';
let expArr_3 = expStrToArr(exp_3);
let expArr_3_suffix = infixToSuffix(expArr_3);
console.log(expArr_3);
console.log(expArr_3_suffix);
console.groupEnd('infixToSuffix');

/**
	step 3: calculation
	 1) 遍历后缀表达式数组，若为数字，则入栈
	 2）若为操作符，则从栈中取2个操作符，先取出的为右操作数，后取出的为左操作数，然后进行运算，得出的结果入栈
	 3）重复该操作，直至表达式遍历完成，栈中剩下的一个元素即为结果
*/
function calculation(suffixArr) {
	console.log(suffixArr);
	let s = new Stack();
	for (let i = 0; i < suffixArr.length; i++) {
		if (suffixArr[i] != '+' && suffixArr[i] != '-' && suffixArr[i] != '*' && suffixArr[i] != '/') {
			s.push(suffixArr[i]);
		} else {
			let right = Number(s.pop());
			let left = Number(s.pop());
			let result = null;
			switch (suffixArr[i]) {
				case '+':
					result = left + right;
					break;
				case '-':
					result = left - right;
					break;
				case '*':
					result = left * right;
					break;
				case '/':
					result = left / right;
					break;
			}
			s.push(result);
		}
	}
	if (s.length() === 1) {
		return s.pop();
	} else {
		return 'error';
	}
}

console.group('calculation');
console.log(calculation(expArr_1_suffix));
console.log(calculation(expArr_2_suffix));
console.log(calculation(expArr_3_suffix));
console.groupEnd('calculation');

/**
4. 现实生活中栈的一个例子是佩兹糖果盒。想象一下你有一盒佩兹糖果，里面塞满了红
色、黄色和白色的糖果，但是你不喜欢黄色的糖果。使用栈（有可能用到多个栈）写一
段程序，在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移出。
*/
function changeCandyStack(candyStack) {
	let newCandyStack = new Stack();
	let bufferStack = new Stack();
	while (candyStack.length() > 0) {
		let candy = candyStack.pop();
		if (candy.color != 'yellow') {
			bufferStack.push(candy);
		}
	}	
	while (bufferStack.length() > 0) {
		newCandyStack.push(bufferStack.pop());
	}
	return newCandyStack;
}

function Candy(id, color) {
	this.id = id;
	this.color = color;
}
let colorArr = ['red', 'yellow', 'white'];
let candyStack = new Stack();
for (let i = 0; i < 50; i++) {
	let id = i;
	/**
	范围内随机数：
	含上限：Math.floor(Math.random() * (max - min + 1)) + min
	不含上限：Math.floor(Math.random() * (max - min)) + min
	*/
	let index = Math.floor(Math.random() * (2 - 0 + 1)) + 0; 
	let color = colorArr[index];
	let candy = new Candy(id, color);
	candyStack.push(candy);
}
console.group('candy');
console.log(changeCandyStack(candyStack));
console.groupEnd('candy');











