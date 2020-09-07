"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amWinsController = void 0;
// index.ts
const axios_1 = require("axios");
const cheerio = require("cheerio");
class amWinsController {
    static getScrapAmWins(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = 'https://osis.amwinsauto.com/prod/index.php?page=main'; // URL we're scraping
                const AxiosInstance = axios_1.default.create(); // Create a new Axios Instance
                // Send an async HTTP Get request to the url
                AxiosInstance.get(url)
                    .then(// Once we have data returned ...
                // Once we have data returned ...
                response => {
                    const html = response.data; // Get the HTML from the HTTP request
                    const $ = cheerio.load(html); // Load the HTML string into cheerio
                    const statsTable = $('.statsTableContainer > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
                    console.log(statsTable);
                    res.send(html);
                })
                    .catch(console.error);
                // const getAllMac = await MAC.find();
                // if(getAllMac){
                //     res.send(getAllMac)
                // }else{
                //     throw new Error("No MAC found")
                // }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.amWinsController = amWinsController;
