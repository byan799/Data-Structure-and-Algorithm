// Queue constructor
function Queue() {
	this.dataStore = [];
	this.enqueue = enqueue;
	this.dequeue = dequeue;
	this.front = front;
	this.back = back;
	this.toString = toString;
	this.empty = empty;
}

// 入队
function enqueue(element) {
	this.dataStore.push(element);
}

// 出队
function dequeue() {
	return this.dataStore.shift();
}

// 读取队首元素
function front() {
	return this.dataStore[0];
}

// 读取队尾元素
function back() {
	return this.dataStore[this.dataStore.length - 1];
}

// 打印队类元素（字符串）
function toString() {
	for (let i = 0; i < this.dataStore.length; i++) {
		console.log(this.dataStore[i]);
	}
}

// 判断队列是否为空
function empty() {
	if (this.dataStore.length === 0) {
		return true;
	} 
	return false;
}

/**
基数排序
对0~99进行2次扫描，第一次按各位排序，第二次按十位排序

1, 88, 15, 26, 65, 38, 25, 64, 35, 99, 82

bin0:  																										  			bin0: 
bin1: 1             																			  			bin1: 1, 15
bin2: 82																									  			bin2: 25, 26
bin3: 																										        bin3: 35, 38
bin4: 64																									        bin4: 
bin5：15, 25, 35   => 1, 82, 64, 15, 25, 35, 26, 88, 38, 99  =>   bin5:           => 1, 15, 25, 26, 35, 38, 64, 82, 88, 99
bin6: 26																													bin6: 64
bin7: 																														bin7:
bin8: 88, 38 																											bin8: 82, 88
bin9: 99 																													bin9: 99

*/

/**
	对数组元素按位排序，存入相应队列中
	@param {Array} nums 元素数组，元素为数字
	@param {Array} queues 队列数组，元素为队列
	@param {Number} n 数字（digit）分类，即为队列个数，这里为10
	@param {Number} digit 数字位，这里为1（个位） & 10（十位） 
*/
function distribute(nums, queues, n, digit) {
	for (let i = 0; i < nums.length; i++) {
		if (digit === 1) {
			queues[nums[i] % 10].enqueue(nums[i]);
		} else {
			queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
		}
	}
}
/**
	从队列中依序导出元素，存入数组中
	@param {Array} queues 队列数组
*/
function collect(queues) {
	let arr = [];
	for (let i = 0; i < queues.length; i++) {
		while (!queues[i].empty()) {
			arr.push(queues[i].dequeue());
		}
	}
	return arr;
}

/**
 test
*/
let numArr = [1, 88, 15, 26, 65, 38, 25, 64, 35, 99, 82];
let queues =[];
for (let i = 0; i < 10; i++) {
	let q = new Queue();
	queues.push(q);
}
console.group('sort with Queue');
distribute(numArr, queues, 10, 1);
let arr_1 = collect(queues);
console.log(arr_1);
distribute(arr_1, queues, 10, 10);
let arr_2 = collect(queues);
console.log(arr_2);
console.groupEnd('sort with Queue');


/**
  优先队列，在队列中删除优先级最高的元素
*/
function priorityDequeue() {
	let priority = this.dataStore[0].priority;
	let index = 0;
	for (let i = 0; i < this.dataStore.length; i++) {
		if (this.dataStore[i].priority < priority) { // assuming higher priority has smaller value
			let index = i;
			break;
		}
	}
	return this.dataStore.splice(index, 1);
}








