
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const {Builder, By} = require('selenium-webdriver');
export class connectController {

    static async getScrapConnect(req, res, next) {
      const browser = await puppeteer.launch();
      try{
         const page = await browser.newPage();
         console.log(1);
         await page.goto('https://tx.connectinsurance.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load', timeout: 0});
         console.log(2);
         await page.$eval('input[name="wl_user_name"]', el => el.value = '219104');
         console.log(3);
         await page.$eval('input[name="wl_user_password"]', el => el.value = '75217');
         console.log(4);
         await page.waitForSelector('input[type=submit]');
         console.log(5);
         const inputElement = await page.$('input[type=submit]');
         console.log(6);
         await inputElement.click();
         console.log(7);
         await page.waitForSelector('input[name="policyNumber"]');
         console.log(8);
         await page.$eval('input[name="policyNumber"]', el => el.value = 'CCB01205216');
         console.log(9);
         const elements = await page.$x('//*[@id="hdr_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
         console.log(10);
         await elements[0].click()
         console.log(11);
         await page.waitForXPath('//*[@id="hdr_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
         console.log(12);
         const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
         console.log(13);
         await response[0].click()
         console.log(14);
         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font')
         console.log(15);
         const spanVal = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font', e => e.innerText);
         console.log(16);
         let text1 = await page.evaluate(h1 => h1.textContent, spanVal[0]);
         console.log(17);
         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]')
         console.log(18);
         const spanVal2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]', e => e.innerText);
         console.log(19);
         let text2 = await page.evaluate(h1 => h1.textContent, spanVal2[0]);
         console.log(20);
         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]')
         console.log(21);
         const spanVal3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]', e => e.innerText);
         console.log(22);
         let text3 = await page.evaluate(h1 => h1.textContent, spanVal3[0]);
         console.log(23);
       await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
       const spanVal4 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td[2]', e => e.innerText);
       console.log(24);
       let text4 = await page.evaluate(h1 => h1.textContent, spanVal4[0]);
      // script waits untill the element by given xpath is on the loaded page
      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
      const spanVal5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]', e => e.innerText);
      console.log(26);
      let text5 = await page.evaluate(h1 => h1.textContent, spanVal5[0]);
       console.log(text1)
      
       console.log(text2)
        
       console.log(text3)
       
       console.log(text4)
        
       console.log(text5)        
      }catch(err){
      console.log(err)
      }finally{
       browser.close();
      }     
    }
    
}
 