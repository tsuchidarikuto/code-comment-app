const questions: string[] = [
  `function sumArray(numbers) {
      let sum = 0;
      for (let number of numbers) {
          sum += number;
      }
      return sum;
  }
  
  const numbers = [1, 2, 3, 4, 5];
  console.log('Sum:', sumArray(numbers));`,


  `function findString(array, target) {
    for (let item of array) {
        if (item === target) {
            return true;
        }
    }
    return false;
}

const fruits = ["apple", "banana", "cherry"];
console.log(findString(fruits, "banana"));
console.log(findString(fruits, "grape"));`,


`function findString(array, target) {
    for (let item of array) {
        if (item === target) {
            return true;
        }
    }
    return false;
}

const fruits = ["apple", "banana", "cherry"];
console.log(findString(fruits, "banana"));
console.log(findString(fruits, "grape"));`,


`function displayUserInfo(user) {
    console.log(\`Name: \${user.name}\`);
    console.log(\`Age: \${user.age}\`);
    console.log(\`Country: \${user.country}\`);
}

// 使用例
const user = {
    name: "Alice",
    age: 25,
    country: "Japan"
};
displayUserInfo(user);`,


`function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

console.log(gcd(48, 18));
console.log(gcd(100, 25)); 
`
  ];
  
  export default questions;
  