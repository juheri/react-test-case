import axios from 'axios'
const base_url = "https://newsapi.org/v2"

export const getNews = (page: string | number | undefined) => {
    return axios({
        url: base_url + "/everything?q=apple&from=2021-07-11&to=2021-07-11&sortBy=popularity&apiKey=c0bd214d9b414deda2ac785409603a8d&page="+page,
        method: "GET",
    })
}