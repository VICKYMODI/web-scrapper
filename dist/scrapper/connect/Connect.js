"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const url = 'https://osis.amwinsauto.com/prod/index.php?page=main'; // URL we're scraping
const AxiosInstance = axios_1.default.create(); // Create a new Axios Instance
// Send an async HTTP Get request to the url
AxiosInstance.get(url)
    .then(// Once we have data returned ...
// Once we have data returned ...
response => {
    const html = response.data; // Get the HTML from the HTTP request
    console.log(html);
})
    .catch(console.error);
