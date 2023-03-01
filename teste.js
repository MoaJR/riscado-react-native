
const returnSumArray = (array, target) => {
  const returnedArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === target) {
        returnedArray.push(i, j);
      }
    }
  }
  return returnedArray;
}

console.log(returnSumArray([2, 7, 11, 15], 9));

