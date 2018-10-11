/** 
1. 创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法。
*/
function Student (name, id, scores) {
	this.name = name;
	this.id = id,
	this.scores = scores;
}
function addScore(score) {
	return this.scores.push(score);
}
function avgScore() {
	let total = this.scores.reduce((accum, cur) => {
		return accum + cur;
	})
	return total / this.scores.length;
}

let stu = new Student('jim', '001', [87, 85, 91, 86, 93]);
stu.addScore = addScore;
stu.avgScore = avgScore;
stu.addScore(80);
let avg = stu.avgScore();

console.log(stu.scores);
console.log(avg);

/**
2. 将一组单词存储在一个数组中，并按正序和倒序分别显示这些单词。
*/
let words = ['hello', 'world', 'apple', 'tea'];
function ascWords (arr) {
	return arr.sort();
}
function descWords (arr) {
	return arr.sort().reverse();
}

console.log(ascWords(words));
console.log(descWords(words));

/**
3. 创建一个对象，使它可以使用一个二维数组来存储一个月内的有用数据。增加一些方法用以显示月平均数、具体某一周平均数和所有周的平均数。
*/
function MonthlyData () {
	this.dataStore = [];
	this.addData = addData;
	this.avgMonth = avgMonth;
	this.avgOneWeek = avgOneWeek;
	this.avgWeeks = avgWeeks;
}
function addData (weekIndex, arr) {
	if (weekIndex >= 1 && weekIndex <= 5) {
		return this.dataStore[weekIndex - 1] = arr;
	}
}
function avgMonth () {
	let total = 0;
	let count = 0;
	for (let i = 0; i < this.dataStore.length; i ++) {
		count += this.dataStore[i].length;
		total += this.dataStore[i].reduce((accum, curr) => {
			return accum + curr;
		})
	}
	return Math.round(total / count);
}
function avgOneWeek (weekIndex) {
	let thisWeek = this.dataStore[weekIndex - 1]
	let thisWeekTotal = thisWeek.reduce((accum, curr) => {
		return accum + curr;
	})
	return Math.round(thisWeekTotal / thisWeek.length);
}
function avgWeeks () {
	let total = 0;
	for (let i = 0; i < this.dataStore.length; i++) {
		total += this.dataStore[i].reduce((accum, curr) => {
			return accum + curr;
		})
	}
	return Math.round(total / this.dataStore.length);
}
let month = new MonthlyData();
month.addData(1, [30, 40, 50]);
month.addData(2, [45, 28, 46]);
month.addData(3, [42, 35, 32]);
month.addData(4, [24, 28, 32, 35]);

console.log(month.dataStore);
console.log(month.avgMonth());
console.log(month.avgOneWeek(2));
console.log(month.avgWeeks());

/**
4. 创建一个对象，它将字母存储在一个数组中，并且用一个方法可以将字母连在一起，显示成一个单词。
*/
function Letter () {
	this.letterArr = [];
	this.addLetter = addLetter;
	this.joinLetter = joinLetter;
}
function addLetter (item) {
	return this.letterArr.push(item);
}
function joinLetter () {
	return this.letterArr.join('');
}

let letter = new Letter()
letter.addLetter('h');
letter.addLetter('e');
letter.addLetter('l');
letter.addLetter('l');
letter.addLetter('o');

console.log(letter.letterArr);
console.log(letter.joinLetter());

