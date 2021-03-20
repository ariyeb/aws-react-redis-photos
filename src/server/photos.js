import Axios from 'axios';

const URL = "http://localhost:3030/";

export const fetchPhotos = async (phtosValue) => {
    try {
        const { data } = await Axios.get(URL + "search-photos/" + phtosValue);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getSearchSuggestions = async (searchValue) => {
    try {
        const { data } = await Axios.get(URL + "get-search-suggestions/" + searchValue);
        console.log("getSearchSuggestions:", data);
        return data;
    } catch (err) {
        console.log(err);
    }
};
