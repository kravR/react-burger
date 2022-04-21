export function getCountsValues(arr) {
  var counts = new Map();

  for (var i in arr) {
    if (counts.has(arr[i])) {
      counts.set(arr[i], counts.get(arr[i]) + 1);
    } else {
      counts.set(arr[i], 1);
    }
  }
  return counts;
}
