import { Series, DataFrame } from 'pandas-js';
import csv from "csvtojson";

const getJson = async () => {
    const data = await csv().fromFile('./new_reddit_data.csv')

    const ds = new Series(data)
    console.log(JSON.stringify(ds));
}

getJson()

