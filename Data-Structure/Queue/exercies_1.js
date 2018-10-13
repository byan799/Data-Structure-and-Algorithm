/**
1. 修改Queue 类，形成一个Deque 类。这是一个和队列类似的数据结构，允许从队列两端添加和删除元素，因此也叫双向队列。
*/
function Deque() {
	this.dataStore = [];
	this.enqueueFront = enqueueFront;
	this.enqueueBack = enqueueBack;
	this.dequeueFront = dequeueFront;
	this.dequeueBack = dequeueBack;
	this.front = front;
	this.back = back;
	this.toString = toString;
	this.empty = empty;
}

function enqueueFront(element) {
	this.dataStore.unshift(element);
}

function dequeueFront() {
	return this.dataStore.shift();
}

function enqueueBack(element) {
	this.dataStore.push(element);
}

function dequeueBack() {
	return this.dataStore.pop();
}

function front() {
	return this.dataStore[0];
}

function back() {
	return this.dataStore[this.dataStore.length - 1];
}

function toString() {
	for (let i = 0; i < this.dataStore.length; i++) {
		console.log(this.dataStore[i]);
	}
}

function empty() {
	if (this.dataStore.length === 0) {
		return true;
	}
	return false;
}

console.group('dequeue');
const dq = new Deque();
dq.enqueueFront('b');
dq.enqueueFront('a');
dq.enqueueBack('c');
dq.enqueueBack('d');
dq.toString();
console.groupEnd('dequeue');

/**
2. 使用前面完成的Deque 类来判断一个给定单词是否为回文。
*/
function compareWithDeque(word) {
	let dq = new Deque();
	let str = '';
	for (let i = 0; i < word.length; i++) {
		dq.enqueueFront(word[i]);
	}
	str = dq.dataStore.join('');
	if (word === str) {
		return true;
	}
	return false;
}

console.group('palindrome');
console.log(compareWithDeque('hello'));
console.log(compareWithDeque('dad'));
console.groupEnd('palindrome');

/**
3. 创建一个优先队列，使得优先级高的元素优先码也大。
*/
function priorityQueue() {
	this.dataStore = [];
	this.enqueue = enqueue;
	this.dequeue = dequeueWithPriority;
	this.front = front;
	this.back = back;
	this.toString = toString;
}

function enqueue(element) {
	this.dataStore.push(element);
}

function dequeueWithPriority() {
	let index = 0;
	let priority = this.dataStore[0].priority;
	for (let i = 1; i < this.dataStore.length; i++) {
		if (priority < this.dataStore[i].priority) {
			priority = this.dataStore[i].priority;
			index = i;
		}
	}
	return this.dataStore.splice(index, 1);
}

console.group('priorityQueue');
const priorityQ = new priorityQueue();
priorityQ.enqueue({id: 1, priority: 1});
priorityQ.enqueue({id: 2, priority: 5});
priorityQ.enqueue({id: 3, priority: 2});
priorityQ.enqueue({id: 4, priority: 7});
priorityQ.enqueue({id: 5, priority: 3});
priorityQ.toString();
console.log('-----');
priorityQ.dequeue();
priorityQ.toString();
console.groupEnd('priorityQueue');

/**
4. 使用优先队列，设计一个候诊室程序，使得候诊室内的活动可以被控制。写一个类似菜单系统，让用户可以进行如下选择：
	a. 患者进入候诊室；
	b. 患者就诊；
	c. 显示等待就诊患者名单。
*/
function diagnoseList() {
	this.patients = [];
	this.addPatient = addPatient;
	this.patientToDiagnose = patientToDiagnose;
	this.showWaitingList = showWaitingList;
}

function addPatient(name, priority) {
	let patient = {};
	patient.name = name;
	patient.priority = priority;
	this.patients.push(patient);
}

function patientToDiagnose() {
	let index = 0;
	let priority = this.patients[0].priority;
	for (let i = 1; i < this.patients.length; i++) {
		if (priority < this.patients[i].priority) {
			priority = this.patients[i].priority;
			index = i;
		}
	}
	return this.patients.splice(index, 1);
}

function showWaitingList() {
	for (let i = 0; i < this.patients.length; i++) {
		console.log(this.patients[i]);
	}
}

console.group('patients');
const patients = new diagnoseList();
patients.addPatient('jim', 1);
patients.addPatient('tom', 3);
patients.addPatient('marry', 7);
patients.addPatient('peter', 5);
patients.patientToDiagnose();
patients.showWaitingList();
console.groupEnd('patients');


