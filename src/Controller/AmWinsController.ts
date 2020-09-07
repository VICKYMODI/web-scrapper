
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const {Builder, By} = require('selenium-webdriver');
export class amWinsController {

    static async getScrapAmWins(req, res, next) {
        
      const browser = await puppeteer.launch();

      try{
         const page = await browser.newPage();
         await page.goto('https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load', timeout: 0});
         await page.$eval('input[name="wl_user_name"]', el => el.value = 'BUCKNERS');
         await page.$eval('input[name="wl_user_password"]', el => el.value = 'csrsbuckner');
         await page.waitForSelector('input[type=submit]');
         const inputElement = await page.$('input[type=submit]');
         await inputElement.click();
         await page.waitForSelector('input[name="policyNumber"]');
         await page.$eval('input[name="policyNumber"]', el => el.value = 'HTG01006630');
         const elements = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
         await elements[0].click()
         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
         const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
         await response[0].click()
         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font')
        const spanVal = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font', e => e.innerText);
        let text1 = await page.evaluate(h1 => h1.textContent, spanVal[0]);
        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]')
        const spanVal2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]', e => e.innerText);
         let text2 = await page.evaluate(h1 => h1.textContent, spanVal2[0]);
         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]')
        const spanVal3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]', e => e.innerText);
        let text3 = await page.evaluate(h1 => h1.textContent, spanVal3[0]);
       await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
       const spanVal4 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td[2]', e => e.innerText);
       let text4 = await page.evaluate(h1 => h1.textContent, spanVal4[0]);
      // script waits untill the element by given xpath is on the loaded page
      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
      const spanVal5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]', e => e.innerText);
      let text5 = await page.evaluate(h1 => h1.textContent, spanVal5[0]);
       console.log(text1)
       console.log(text2)
       console.log(text3)
       console.log(text4) 
       console.log(text5)
       res.send({
         data : {
          text1 : text1,
          text2 : text2,
          text3 : text3,
          text4 : text4,
         }
       })
      }catch(err){
        throw new Error(err)
      }finally{
       browser.close();
      }     
    }


    static async getPolicyInfo(req,res,next){
      const browser = await puppeteer.launch();
      // const amwins = {
      //   userid : "BUCKNERS",
      //   password : "csrsbuckner"
      // }
      try{
        //Login code
        const page = await browser.newPage();
        await page.goto('https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load', timeout: 0});
        await page.$eval('input[name="wl_user_name"]', el => el.value = 'BUCKNERS');
        await page.$eval('input[name="wl_user_password"]', el => el.value = 'csrsbuckner');
        await page.waitForSelector('input[type=submit]');
        const inputElement = await page.$('input[type=submit]');
        await inputElement.click();


        //Fetch Policy
         const Policy = req.query.Policy;
         console.log("Policy",Policy);
        await page.waitForSelector('input[name="policyNumber"]');
        await page.$eval('input[name="policyNumber"]', el => el.value = Policy);
        const elements = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
        await elements[0].click()
        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
        const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
        await response[0].click()
        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font')
        const spanVal = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font', e => e.innerText);
        let text1 = await page.evaluate(h1 => h1.textContent, spanVal[0]);
        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]')
        const spanVal2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]', e => e.innerText);
        let text2 = await page.evaluate(h1 => h1.textContent, spanVal2[0]);
        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]')
        const spanVal3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]', e => e.innerText);
        let text3 = await page.evaluate(h1 => h1.textContent, spanVal3[0]);
        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
        const spanVal4 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td[2]', e => e.innerText);
        let text4 = await page.evaluate(h1 => h1.textContent, spanVal4[0]);
     // script waits untill the element by given xpath is on the loaded page
        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
        const spanVal5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]', e => e.innerText);
        let text5 = await page.evaluate(h1 => h1.textContent, spanVal5[0]);
      console.log(text1)
      console.log(text2)
      console.log(text3)
      console.log(text4) 
      console.log(text5)
      //send response
      res.send({
        data : {
         text1 : text1,
         text2 : text2,
         text3 : text3,
         text4 : text4,
        }
      })
     }catch(err){
       throw new Error(err)
     }finally{
      browser.close();
     }     

      
    }
    
}
 