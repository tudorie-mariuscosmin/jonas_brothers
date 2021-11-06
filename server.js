import { Series, DataFrame } from 'pandas-js';

const ds = new Series([1, 2, 3, 4], {name: 'My test name', index: [2, 3, 4, 5]})
console.log(ds.toString());
