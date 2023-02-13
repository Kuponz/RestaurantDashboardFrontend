const value = 'ba';
const regex = new RegExp(value, 'i');

const items = ['Apple', 'Banana', 'Pineapple', 'Grape'];

const filteredItems = items.filter(item => item.match(regex));

console.log(filteredItems); // Output: [ 'Apple' ]