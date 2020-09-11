
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const {Builder, By} = require('selenium-webdriver');
const {logger} = require('../utils/logger');
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

    static async doInNewContext(action) {
      // fetch the browser version (since Chrome 62 the browser target URL is
      // generated at runtime and can be obtained via the '/json/version'
      // endpoint, fallback to '/devtools/browser' if not present)
      const {webSocketDebuggerUrl} = await CDP.Version();
      // connect to the DevTools special target
      const browser = await CDP({
          target: webSocketDebuggerUrl || 'ws://localhost:9222/devtools/browser'
      });
      // create a new context
      const {Target} = browser;
      const {browserContextId} = await Target.createBrowserContext();
      const {targetId} = await Target.createTarget({
          url: 'about:blank',
          browserContextId
      });
      // connct to the new context
      const client = await CDP({target: targetId});
      // perform user actions on it
      try {
          await action(client);
      } finally {
          // cleanup
          await Target.closeTarget({targetId});
          await browser.close();
      }
    }

    static async getPolicyInfo(req,res,next){
      
      const amwins = {
        userid : "BUCKNERS",
        password : "csrsbuckner"
      }
       
      try{
        if(req.setTabStatus == 'use same session'){
          logger.info("using different browser session")
          console.log("using same browser context")
          //start web scrappping
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          //const page = await browser.newPage({ context: 'another-context' }); // creates a page in another browser context
          const data = await page.goto('http://127.0.0.1:9222/json/version',{waitUntil: 'load', timeout: 0});
          //let test = JSON.stringify(data)
          await page.screenshot({path:'error.png'})
          logger.info("using different browser session",data)
          console.log("using same session",data)
          

          //end web scrapping

        }else if(req.setTabStatus == 'create new session'){
          logger.info("using different browser session")
          const browser = await puppeteer.launch();
          var page = await browser.newPage({ context: 'another-context' }); // creates a page in another browser context
          const data = await page.goto('http://127.0.0.1:9222/json/version',{waitUntil: 'load', timeout: 0});
          //let test = JSON.stringify(data)
          await page.screenshot({path:'error.png'})
          logger.info("using different browser session",data)
          res.send("test")

        }
      }catch(e){
        await page.screenshot({path:'error.png'})
        logger.error(e)
        next(e)
      }         
    }
    
    // this basically is the usual example
    static async example(client) {
      // extract domains
      const {Network, Page} = client;
      // setup handlers
      Network.requestWillBeSent((params) => {
      console.log(params.request.url);
    });
  // enable events then start!
  await Promise.all([Network.enable(), Page.enable()]);
  await Page.navigate({url: 'https://github.com'});
  await Page.loadEventFired();
}
}
async function newPageWithNewContext(browser) {
  const {browserContextId} = await browser._connection.send('Target.createBrowserContext');
  const page = await browser._createPageInContext(browserContextId);
  page.browserContextId = browserContextId;
  return page;
}

const CDP = require('chrome-remote-interface');

async function closePage(browser, page) {
  if (page.browserContextId != undefined) {
    await browser._connection.send('Target.disposeBrowserContext', {browserContextId: page.browserContextId});
  } else {
    await page.close();
  }
}

