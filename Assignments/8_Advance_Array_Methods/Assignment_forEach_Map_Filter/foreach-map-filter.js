function doubleValues(arr){
    return arr.map(function(value) {
        return value*2;
    });
}

function onlyEvenValues(arr){
    return arr.filter(value => {
         if(!(value%2)) {
            return true; 
         }
    });
    
}

function showFirstAndLast(arr){
    return arr.map(value => {
        return value.substr(0,1) + value.substr(value.length - 1);
    })
}

function addKeyAndValue(arr,key,value){
    return arr.map(element => {
        element[key] = value;
        return element;
    })
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

//What are your thoughts on this one, surely there's a better way to implement it 

function vowelCount(str){
   let returnObj = [];
   let vowelKeys = ["a","e","i","o","u"];
   let vowels = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0
   }
   str.split('').forEach(char => {
    switch (char) {
        case "a":
            vowels.a++
            break;
        case "e":
            vowels.e++
            break;
        case "i":
            vowels.i++
            break;
        case "o":
            vowels.o++
            break;
        case "u":
            vowels.u++
    }
   });
   vowelKeys.forEach(letter => {
    if(vowels[letter] == 0) {
        delete vowels[letter];
    }
   })
   return vowels;
}

/*
Write a function called doubleValuesWithMap which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValuesWithMap([1,2,3]) // [2,4,6]
    doubleValuesWithMap([1,-2,-3]) // [2,-4,-6]
*/

function doubleValuesWithMap(arr) {
    return arr.map(value => { return value*2 });
}

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

function valTimesIndex(arr){
    return arr.map(function(value,index) { return value*index }); 
}

/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractKey(arr, key){
    return arr.map(function(element) { 
        return element[key];
    })
}

/*
Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first" and the value of a key with the name of  "last" in each object, concatenated together with a space. 

Examples:
    extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]) // ['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']
*/

function extractFullName(arr){
    return arr.map(function(element) { 
        return element.first + ' ' + element.last;
    })
}

/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
*/

function filterByValue(arr, key) { 
    return arr.filter(element => {
        return element.hasOwnProperty(key);
    })
}

/*
Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter or undefined if the value is not found in the array.

Examples:
    find([1,2,3,4,5], 3) // 3
    find([1,2,3,4,5], 10) // undefined
*/

function find(arr, searchValue) {
    if(arr.includes(searchValue)) {return searchValue;}
}

/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the array.

Examples:
    findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true) // {first: 'Tim', last:"Garcia", isCatOwner: true}
*/

function findInObj(arr, key, searchValue) {
    let results = arr.filter(element => {
        return element[key] == searchValue 
    })
    return results[0];
}

/*
Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed. Every character in the new string should be lowercased.

Examples:
    removeVowels('Elie') // ('l')
    removeVowels('TIM') // ('tm')
    removeVowels('ZZZZZZ') // ('zzzzzz')
*/

function removeVowels(str) {
    let vowels = ["a","e","i","o","u"];
    let charArray = Array.from(str.toLowerCase()).filter(char => {
        console.log(`checking if ${char} is a vowel`);
        return !vowels.includes(char)
    });
    return charArray.join("");
}

// can this be down with just a filter?

function doubleOddNumbers(arr) {
    let temp = arr.filter(value => {
        return (value%2);
    })
    return temp.map(value => {return value*2});
}
