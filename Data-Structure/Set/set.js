function Set() {
	this.dataStore = [];
}

// assuming typeof data === Number, String
Set.prototype.contains = function(data) {
	if (this.dataStore.indexOf(data) > -1) {
		return true;
	}
	return false;
}

Set.prototype.add = function(data) {
	if (!this.contains(data)) {
		this.dataStore.push(data);
		return true;
	}
	return false;
}

Set.prototype.remove = function(data) {
	let index = this.dataStore.indexOf(data);
	if (index > -1) {
		this.dataStore.splice(index, 1);
		return true;
	}
	return false;
}

Set.prototype.size = function() {
	return this.dataStore.length;
}

Set.prototype.display = function() {
	for (let i = 0; i < this.dataStore.length; i++) {
		console.log(this.dataStore[i]);
	}
}

Set.prototype.union = function(set) {
	let tempSet = new Set();
	for (let i = 0; i < this.dataStore.length; i++) {
		tempSet.add(this.dataStore[i]);
	}
	for (let i = 0; i < set.size(); i++) {
		if (!tempSet.contains(set.dataStore[i])) {
			tempSet.add(set.dataStore[i]);
		}
	}
	return tempSet;
}

Set.prototype.intersect = function(set) {
	let tempSet = new Set();
	for (let i = 0; i < this.dataStore.length; i++) {
		if (set.contains(this.dataStore[i])) {
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}

Set.prototype.difference = function(set) {
	let tempSet = new Set();
	for (let i = 0; i < this.dataStore.length; i++) {
		if (!set.contains(this.dataStore[i])) {
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}

Set.prototype.higher = function(element) {
	let tempSet = new Set();
	for (let i = 0; i < this.dataStore.length; i++) {
		if (this.dataStore[i] > element) {
			tempSet.add(this.dataStore[i]);
		}
	}
	if (tempSet.size() > 0) {
		let min = tempSet.dataStore[0];
		for (let i = 1; i < tempSet.size(); i++) {
			if (tempSet.dataStore[i] < min) {
				min = tempSet.dataStore[i];
			}
		}
		return min;
	}
	return false;
}

Set.prototype.lower = function(element) {
	let tempSet = new Set();
	for (let i = 0; i < this.dataStore.length; i++) {
		if (this.dataStore[i] < element) {
			tempSet.add(this.dataStore[i]);
		}
	}
	if (tempSet.size() > 0) {
		let max = tempSet.dataStore[0];
		for (let i = 1; i < tempSet.size(); i++) {
			if (tempSet.dataStore[i] > max) {
				max = tempSet.dataStore[i];
			}
		}
		return max;
	}
	return false;
}

// test
const arr = [1, 5, 23, 12, 45, 25, 33, 12, 44, 45, 89, 60, 56];
const set_1 = new Set();
for (let i = 0; i < arr.length; i++) {
	set_1.add(arr[i]);
}
set_1.display();
console.log('======');
set_1.add(67);
set_1.remove(23);
set_1.display();
console.log('======');
set_2 = new Set();
set_2.add(12);
set_2.add(33);
set_2.add(44);
set_2.add(100);
set_1.union(set_2).display();
console.log('======');
set_1.intersect(set_2).display();
console.log('======');
set_1.difference(set_2).display();
console.log('======');
console.log(set_1.higher(50));
console.log(set_1.lower(50));












