import dataList from '../data/data.json';

export const getAll = () => dataList;

export const searchQuery = (email: string, number: string) => {
    let result;

    if (number) {
        result = dataList.filter(dataItem => dataItem.email === email && dataItem.number === number);
    } else {
        result = dataList.filter(dataItem => dataItem.email === email);
    }

    return result;
}