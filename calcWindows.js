class Queue {
  constructor() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
  }

  get front() {
    return this._storage[this._oldestIndex];
  }

  get back() {
    return this._storage[this._newestIndex - 1];
  }

  get size() {
    return this._newestIndex - this._oldestIndex;
  }

  enqueue(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
  }

  dequeue() {
    if (this._oldestIndex !== this._newestIndex) {
      const deletedData = this._storage[this._oldestIndex];
      delete this._storage[this._oldestIndex];
      this._oldestIndex++;

      return deletedData;
    }
  }
}

const findIncreasingSubranges = (range) => {
  let count = 0;
  const subranges = new Queue();

  if (range.length === 1) {
    return { count, subranges };
  }

  let start = 0;
  let end = 1;

  for (end; end < range.length; end++) {
    // If subrange no longer increasing, calculate the number of subranges within it
    if (range[end] <= range[end - 1]) {
      count += (end - start - 1) * (end - start) / 2;
      // Only consider subranges with more than one element
      if (start !== end - 1) {
        subranges.enqueue([start, end - 1]);
      }
      start = end;
    }
  }
  // Add right most subrange if it exists
  if (start !== end - 1) {
    count += (end - start - 1) * (end - start) / 2;
    subranges.enqueue([start, end - 1]);
  }

  return { count, subranges };
}

const updateIncreasingSubrangeWindow = (windowInfo, pos, k, data) => {
  if (k === 1) {
    windowInfo.count = 0;
    return windowInfo;
  }

  const { subranges } = windowInfo;

  const firstSubrange = subranges.front;
  // If new left endpoint was part of a subrange, shrink subrange
  if (firstSubrange && firstSubrange[0] < pos) {
    windowInfo.count -= firstSubrange[1] - firstSubrange[0];
    firstSubrange[0]++;
    // If subrange has a single element, remove subrange
    if (firstSubrange[0] === firstSubrange[1]) {
      subranges.dequeue();
    }
  }

  const lastSubrange = subranges.back;
  const oldDatum = data[pos + k - 2];
  const newDatum = data[pos + k - 1];
  // Check if new right endpoint is greater than old right endpoint
  if (newDatum > oldDatum) {
    // If old right endpoint was part of a subrange, extend subrange
    if (lastSubrange && lastSubrange[1] === pos + k - 2) {
      lastSubrange[1] = pos + k - 1;
      windowInfo.count += lastSubrange[1] - lastSubrange[0];
    } else {
      // else add new increasing subrange
      subranges.enqueue([pos + k - 2, pos + k - 1]);
      windowInfo.count++;
    }
  }

  return windowInfo;
}

const calcIncreasingSubrangeWindows = (data, k) => {
  const results = [];

  let windowInfo = findIncreasingSubranges(data.slice(0, k));
  results.push(windowInfo.count);

  for (let i = 1; i < data.length - k + 1; i++) {
    windowInfo = updateIncreasingSubrangeWindow(windowInfo, i, k, data);
    results.push(windowInfo.count);
  }

  return results;
}

const calcWindows = (data, k) => {
  const increasingWindows = calcIncreasingSubrangeWindows(data, k);
  const decreasingWindows = calcIncreasingSubrangeWindows(data.reverse(), k);
  decreasingWindows.reverse();

  return increasingWindows.map((num, i) => num - decreasingWindows[i]);
}

module.exports = calcWindows;
