
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
import Agent from '../models/Agent';
import Office from '../models/Office';
const {Builder, By} = require('selenium-webdriver');
const { Cluster } = require('puppeteer-cluster');
const {logger} = require('../utils/logger');
export class amWinsController {

    // static async getScrapAmWins(req, res, next) {
        
    //   const browser = await puppeteer.launch();

    //   try{
    //      const page = await browser.newPage();
    //      await page.goto('https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load', timeout: 0});
    //      await page.$eval('input[name="wl_user_name"]', el => el.value = 'BUCKNERS');
    //      await page.$eval('input[name="wl_user_password"]', el => el.value = 'csrsbuckner');
    //      await page.waitForSelector('input[type=submit]');
    //      const inputElement = await page.$('input[type=submit]');
    //      await inputElement.click();
    //      await page.waitForSelector('input[name="policyNumber"]');
    //      await page.$eval('input[name="policyNumber"]', el => el.value = 'HTG01006630');
    //      const elements = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
    //      await elements[0].click()
    //      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
    //      const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
    //      await response[0].click()
    //      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font')
    //     const spanVal = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font', e => e.innerText);
    //     let text1 = await page.evaluate(h1 => h1.textContent, spanVal[0]);
    //     await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]')
    //     const spanVal2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]', e => e.innerText);
    //      let text2 = await page.evaluate(h1 => h1.textContent, spanVal2[0]);
    //      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]')
    //     const spanVal3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]', e => e.innerText);
    //     let text3 = await page.evaluate(h1 => h1.textContent, spanVal3[0]);
    //    await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
    //    const spanVal4 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td[2]', e => e.innerText);
    //    let text4 = await page.evaluate(h1 => h1.textContent, spanVal4[0]);
    //   // script waits untill the element by given xpath is on the loaded page
    //   await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
    //   const spanVal5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]', e => e.innerText);
    //   let text5 = await page.evaluate(h1 => h1.textContent, spanVal5[0]);
    //    console.log(text1)
    //    console.log(text2)
    //    console.log(text3)
    //    console.log(text4) 
    //    console.log(text5)
    //    res.send({
    //      data : {
    //       text1 : text1,
    //       text2 : text2,
    //       text3 : text3,
    //       text4 : text4,
    //      }
    //    })
    //   }catch(err){
    //     throw new Error(err)
    //   }finally{
    //    browser.close();
    //   }     
    // }
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

      const Username = req.query.username;
      const company = req.query.product;
      let UserID ;
      let Password;
      let companyToFetch
      try{
        
        const agentData:any = await Agent.findOne({'Username':Username});
        console.log("agentData",agentData)
        const officeData:any = await Office.findOne({'IslandName':agentData.OfficeIsland})
        const companyCredentials = officeData.insurance_site_credentials;
        console.log("officeData",officeData)

        UserID = companyCredentials.aggressive.login;
        console.log("userID",UserID)
        Password = companyCredentials.aggressive.password;
        console.log("password",Password)

      }catch(e){
        throw new Error(e)
      }

       const already_logged_in_user={}

            //10000= 10s
            const outhTime=10000

            const users={
              //username     password       policyNumber
              0:['BUCKNERS','csrsbuckner','HTG01006630',],
              1:['BUCKNEfffRS','csrsbuckner','HTG01006630'],
            }
                const cluster = await Cluster.launch({
                    concurrency: Cluster.CONCURRENCY_CONTEXT,
                    //same time  open 6 tab in browser and didn't share sessions
                    maxConcurrency:2,
                });
      try{
        if(req.setTabStatus == 'use same session'){
          logger.info("using different browser session")
          console.log("using same browser context")
          //start web scrappping
          //const browser = await puppeteer.launch({headless:false});
          //const page = await browser.newPage();
          //const page = await browser.newPage({ context: 'another-context' }); // creates a page in another browser context
          //const data = await page.goto('http://127.0.0.1:9222/json/version',{waitUntil: 'load', timeout: 0});
          //let test = JSON.stringify(data)
              await cluster.task(async ({ page, data: url}) => {
                await page.goto('https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load'});
                await page.type('input[name="wl_user_name"]', url[url['i']][0]);

                await page.type('input[name="wl_user_password"]',url[url['i']][1]);
                await page.waitForSelector('input[type=submit]');
                const inputElement = await page.$('input[type=submit]');
                await inputElement.click();

                try {
                  await page.waitForSelector('input[name="policyNumber"]')
                    await page.type('input[name="policyNumber"]',url[url['i']][2]);
                    await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
                    const elements = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
                    await elements[0].click()
            
                          try{
                                //get status data if policy number is right
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
                              const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
                              await response[0].click()

                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font')
                              const spanVal = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/font', e => e.innerText);
                              let status = await page.evaluate(h1 => h1.textContent, spanVal[0]);
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]')
                              const spanVal2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]', e => e.innerText);
                              let policy = await page.evaluate(h1 => h1.textContent, spanVal2[0]);
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]')
                              const spanVal3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[4]/td[2]', e => e.innerText);
                              let effective = await page.evaluate(h1 => h1.textContent, spanVal3[0]);
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
                              const spanVal4 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td[2]', e => e.innerText);
                              let expiration = await page.evaluate(h1 => h1.textContent, spanVal4[0]);
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
                              const spanVal5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]', e => e.innerText);
                              let inception = await page.evaluate(h1 => h1.textContent, spanVal5[0]);
                              //------------------------------Financial Info --------------
                                                       await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/table/tbody')
                                                       const Financ = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/table/tbody/tr[4]/td/span[2]', e => e.innerText);
                                                       let Financ1= await page.evaluate(h1 => h1.textContent, Financ[0]);
                                                       const Financ2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/table/tbody/tr[5]/td/i/font', e => e.innerText);
                                                       let Financtext2= await page.evaluate(h1 => h1.textContent, Financ2[0]);
                                                       const Financ3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/table/tbody/tr[6]/td/div/span', e => e.innerText);
                                                       let Financtext3= await page.evaluate(h1 => h1.textContent, Financ3[0]);
                                                       console.log("Amount Due: "+Financ1)
                                                       console.log(Financtext2)
                                                       console.log(Financtext3)
                                                      //------------------------------End Financial Info --------------
                            
                                                      //----------------------Drivers: ----------------------
                                                      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody')
                                                      const Drivers2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[3]/td[1]/a', e => e.innerText);
                                                      let Driverstext2= await page.evaluate(h1 => h1.textContent, Drivers2[0]);
                                                      const Drivers3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[4]/td[1]/a', e => e.innerText);
                                                      let Driverstext3= await page.evaluate(h1 => h1.textContent, Drivers3[0]);
                                                      const Drivers4 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[5]/td[1]/a', e => e.innerText);
                                                      let Driverstext4= await page.evaluate(h1 => h1.textContent, Drivers4[0]);
                                                      const Drivers5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[3]/td[2]', e => e.innerText);
                                                      let Driverstext5= await page.evaluate(h1 => h1.textContent, Drivers5[0]);
                                                      const Drivers6 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[4]/td[2]', e => e.innerText);
                                                      let Driverstext6= await page.evaluate(h1 => h1.textContent, Drivers6[0]);
                                                      const Drivers7 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[5]/td[2]', e => e.innerText);
                                                      let Driverstext7= await page.evaluate(h1 => h1.textContent, Drivers7[0]);
                                                      const Drivers8 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[3]/td[3]/font', e => e.innerText);
                                                      let Driverstext8= await page.evaluate(h1 => h1.textContent, Drivers8[0]);
                                                      const Drivers9 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[4]/td[3]/font', e => e.innerText);
                                                      let Driverstext9= await page.evaluate(h1 => h1.textContent, Drivers9[0]);
                                                      const Drivers10 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[5]/td[3]/font', e => e.innerText);
                                                      let Driverstext10= await page.evaluate(h1 => h1.textContent, Drivers10[0]);
                                                      const Drivers11 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[3]/td[4]', e => e.innerText);
                                                      let Driverstext11= await page.evaluate(h1 => h1.textContent, Drivers11[0]);
                                                      const Drivers12 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[4]/td[4]', e => e.innerText);
                                                      let Driverstext12= await page.evaluate(h1 => h1.textContent, Drivers12[0]);
                                                      const Drivers13 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[5]/td[4]', e => e.innerText);
                                                      let Driverstext13= await page.evaluate(h1 => h1.textContent, Drivers13[0]);
                                                      const Drivers14 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[3]/td[5]', e => e.innerText);
                                                      let Driverstext14= await page.evaluate(h1 => h1.textContent, Drivers14[0]);
                                                      const Drivers15 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[4]/td[5]', e => e.innerText);
                                                      let Driverstext15= await page.evaluate(h1 => h1.textContent, Drivers15[0]);
                                                      const Drivers16 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody/tr[5]/td[5]', e => e.innerText);
                                                      let Driverstext16= await page.evaluate(h1 => h1.textContent, Drivers16[0]);
                                                      console.log('Driver #: '+Driverstext2)
                                                      console.log("Name : "+ Driverstext5)
                                                      console.log("Type : "+ Driverstext8)
                                                      console.log("Date of Birth : "+ Driverstext11)
                                                      console.log("Gender : "+ Driverstext14)
                                                      console.log("              " )
                                                      console.log('Driver # : '+Driverstext3)
                                                      console.log("Name : "+ Driverstext6)
                                                      console.log("Type : "+ Driverstext9)
                                                      console.log("Date of Birth : "+ Driverstext12)
                                                      console.log("Gender : "+ Driverstext15)
                                                      console.log("              " )
                                                      console.log('Driver # : '+Driverstext4)
                                                      console.log("Name : "+ Driverstext7)
                                                      console.log("Type : "+ Driverstext10)
                                                      console.log("Date of Birth : "+ Driverstext13)
                                                      console.log("Gender : "+ Driverstext16)
                                                      console.log("              " )
                                                      //----------------------End Drivers: ----------------------
                                                        //----------------------Vehicle: ----------------------
                                                      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody')
                                                      const Vehicle2 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[3]/td[1]/a', e => e.innerText);
                                                      let Vehicletext2= await page.evaluate(h1 => h1.textContent, Vehicle2[0]);
                                                      const Vehicle3 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[4]/td[1]/a', e => e.innerText);
                                                      let Vehicletext3= await page.evaluate(h1 => h1.textContent, Vehicle3[0]);
                                                      const Vehicle4 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[3]/td[2]', e => e.innerText);
                                                      let Vehicletext4= await page.evaluate(h1 => h1.textContent, Vehicle4[0]);
                                                      const Vehicle5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[4]/td[2]', e => e.innerText);
                                                      let Vehicletext5= await page.evaluate(h1 => h1.textContent, Vehicle5[0]);
                                                      const Vehicle6 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[3]/td[3]', e => e.innerText);
                                                      let Vehicletext6= await page.evaluate(h1 => h1.textContent, Vehicle6[0]);
                                                      const Vehicle7 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[4]/td[3]', e => e.innerText);
                                                      let Vehicletext7= await page.evaluate(h1 => h1.textContent, Vehicle7[0]);
                                                      const Vehicle8 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[3]/td[4]', e => e.innerText);
                                                      let Vehicletext8= await page.evaluate(h1 => h1.textContent, Vehicle8[0]);
                                                      const Vehicle9 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[4]/td[4]', e => e.innerText);
                                                      let Vehicletext9= await page.evaluate(h1 => h1.textContent, Vehicle9[0]);
                                                      const Vehicle10 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[3]/td[5]', e => e.innerText);
                                                      let Vehicletext10= await page.evaluate(h1 => h1.textContent, Vehicle10[0]);
                                                      const Vehicle11 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[4]/td[5]', e => e.innerText);
                                                      let Vehicletext11= await page.evaluate(h1 => h1.textContent, Vehicle11[0]);
                                                      const Vehicle12 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[3]/td[6]', e => e.innerText);
                                                      let Vehicletext12= await page.evaluate(h1 => h1.textContent, Vehicle12[0]);
                                                      const Vehicle13 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody/tr[4]/td[6]', e => e.innerText);
                                                      let Vehicletext13= await page.evaluate(h1 => h1.textContent, Vehicle13[0]);
                                                                                console.log('Vehicle #: '+Vehicletext2)
                                                                                console.log("Year : "+ Vehicletext4)
                                                                                console.log("Make : "+ Vehicletext6)
                                                                                console.log("Model : "+ Vehicletext8)
                                                                                console.log("VIN : "+ Vehicletext10)
                                                                                console.log("Territory : "+ Vehicletext12)
                                                                                console.log("              ")
                            
                                                                                console.log('Vehicle #: '+Vehicletext3)
                                                                                console.log("Year : "+ Vehicletext5)
                                                                                console.log("Make : "+ Vehicletext7)
                                                                                console.log("Model : "+ Vehicletext9)
                                                                                console.log("VIN : "+ Vehicletext11)
                                                                                console.log("Territory : "+  Vehicletext13)
                                                                                console.log("              ")
                                                                                                  //----------------------End Vehicle: ----------------------
                                                                                  //----------------------Make Payment ----------------------                    
                                                await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td/form/table/tbody/tr[2]/td/input')
                                                const make = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td/form/table/tbody/tr[2]/td/input')
                                                await make[0].click()
                                               await page.waitForXPath('/html/body/form/table[1]/tbody/tr[4]/td/table/tbody/tr/td/table/tbody')
                                               const make1 = await page.$x('/html/body/form/table[1]/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]', e => e.innerText);
                                               let maketext1= await page.evaluate(h1 => h1.textContent, make1[0]);
                                               await page.type('#pmt_amt_oth_field','55');
                            //----------------------End Make Payment ----------------------
                              
                              await page.goto('https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load'});
                              
                              // console.log("User: "+url[url['i']][0])
                              // console.log("      "+text1)
                              // console.log("      "+text2)
                              // console.log("      "+text3)
                              // console.log("      "+text4)
                              // console.log("      "+text5)
                              // console.log('Done!!!')
                              // console.log('Start 30 min')
                              res.send({
                                data : {
                                      'Status'          :      status,
                                      'Policy Term'     :      policy,
                                      'Effective Date'  :      effective,
                                      'Expiration Date' :      expiration,
                                      'Inception Date'  :      inception,
                                      "Finance" :   {
                                        "Financ1"        :    Financ1,
                                        "Financtext2"    :    Financtext2,
                                        "Financtext3"    :    Financtext3
                                      },
                                      // console.log('Driver #: '+Driverstext2)
                                      //                 console.log("Name : "+ Driverstext5)
                                      //                 console.log("Type : "+ Driverstext8)
                                      //                 console.log("Date of Birth : "+ Driverstext11)
                                      //                 console.log("Gender : "+ Driverstext14)
                                      //                 console.log("              " )
                                      //                 console.log('Driver # : '+Driverstext3)
                                      //                 console.log("Name : "+ Driverstext6)
                                      //                 console.log("Type : "+ Driverstext9)
                                      //                 console.log("Date of Birth : "+ Driverstext12)
                                      //                 console.log("Gender : "+ Driverstext15)
                                      //                 console.log("              " )
                                      //                 console.log('Driver # : '+Driverstext4)
                                      //                 console.log("Name : "+ Driverstext7)
                                      //                 console.log("Type : "+ Driverstext10)
                                      //                 console.log("Date of Birth : "+ Driverstext13)
                                      //                 console.log("Gender : "+ Driverstext16)
                                  "Driver": {
                                    "Driver #": Driverstext2,
                                    "Name": Driverstext6,
                                    "Type": Driverstext9,
                                    "Date of Birth ": Driverstext12,
                                    "Gender": Driverstext15,
                                },
                                // console.log('Vehicle #: '+Vehicletext2)
                                //                                                 console.log("Year : "+ Vehicletext4)
                                //                                                 console.log("Make : "+ Vehicletext6)
                                //                                                 console.log("Model : "+ Vehicletext8)
                                //                                                 console.log("VIN : "+ Vehicletext10)
                                //                                                 console.log("Territory : "+ Vehicletext12)
                                //                                                 console.log("              ")
                                "Vehicle": {
                                  "Vehicle #": Vehicletext4,
                                  "Year": Vehicletext6,
                                  "Make": Vehicletext8,
                                  "Date of Birth ": Vehicletext10,
                                  "Gender": Vehicletext12,
                              },
                               
                                }
                            })
                              //End get status data 
                              //wait 30min and logout 
                              await new Promise(r => setTimeout(r, outhTime))
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font')
                              const UsName = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font', e => e.innerText);
                              let logout30 = await page.evaluate(h1 => h1.textContent, UsName[0]);

                              console.log(logout30)
                              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font/center/a')
                              const logout_response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font/center/a')
                              await logout_response[0].click()
                              console.log("           ")

                          }catch (error) {
                                  //check if  policy number is invalid
                            await page.screenshot({path: url[url['i']][0]+'_'+new Date().getTime()+'.png'});
                                console.log("Invalid policy number : " +url[url['i']][2])

                                console.log("           ")


                        }
                } catch (error) {
                  console.log("Username : " +url[url['i']][0] +" Password : "+ url[url['i']][1]+" is invalid" )
                    await page.screenshot({path: url[url['i']][0]+'_'+new Date().getTime()+'.png'});
                  console.log("           ")
                }
        });

          // await page.screenshot({path:'error.png'})
          // logger.info("using different browser session",data)
          // console.log("using same session",data)
          

          //end web scrapping

        }else if(req.setTabStatus == 'create new session'){
          logger.info("using different browser session")
          // const browser = await puppeteer.launch({headless:false});
          // var page = await browser.newPage({ context: 'another-context' }); // creates a page in another browser context
          // const data = await page.goto('http://127.0.0.1:9222/json/version',{waitUntil: 'load', timeout: 0});
          // page.bringtoFront()
          //let test = JSON.stringify(data)
                      
            
                await cluster.task(async ({ page, data: url}) => {
                        await page.goto('https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load'});
                        await page.type('input[name="wl_user_name"]', url[url['i']][0]);

                        await page.type('input[name="wl_user_password"]',url[url['i']][1]);
                        await page.waitForSelector('input[type=submit]');
                        const inputElement = await page.$('input[type=submit]');
                        await inputElement.click();

                        try {
                          await page.waitForSelector('input[name="policyNumber"]')
                            await page.type('input[name="policyNumber"]',url[url['i']][2]);
                            await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
                            const elements = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
                            await elements[0].click()
                    
                                  try{
                                        //get status data if policy number is right
                                      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
                                      const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]')
                                      await response[0].click()
                                      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
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
                                      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]')
                                      const spanVal5 = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr/td[2]/table/tbody/tr[6]/td[2]', e => e.innerText);
                                      let text5 = await page.evaluate(h1 => h1.textContent, spanVal5[0]);
                                     
                                      await page.goto('https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch',{waitUntil: 'load'});
                                      console.log("User: "+url[url['i']][0])
                                      console.log("      "+text1)
                                      console.log("      "+text2)
                                      console.log("      "+text3)
                                      console.log("      "+text4)
                                      console.log("      "+text5)
                                      console.log('Done!!!')
                                      console.log('Start 30 min')
                                      
                                      //End get status data 
                                      //wait 30min and logout 
                                      await new Promise(r => setTimeout(r, outhTime))
                                      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font')
                                      const UsName = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font', e => e.innerText);
                                      let logout30 = await page.evaluate(h1 => h1.textContent, UsName[0]);

                                      console.log(logout30)
                                      await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font/center/a')
                                      const logout_response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font/center/a')
                                      await logout_response[0].click()
                                      console.log("           ")

                                  }catch (error) {
                                          //check if  policy number is invalid
                                    await page.screenshot({path: url[url['i']][0]+'_'+new Date().getTime()+'.png'});
                                        console.log("Invalid policy number : " +url[url['i']][2])

                                        console.log("           ")


                                }
                        } catch (error) {
                          console.log("Username : " +url[url['i']][0] +" Password : "+ url[url['i']][1]+" is invalid" )
                            await page.screenshot({path: url[url['i']][0]+'_'+new Date().getTime()+'.png'});
                          console.log("           ")
                        }
                });


          // await page.screenshot({path:'error.png'})
          // logger.info("using different browser session",data)
          res.send("test")

        }
        for (var i = 0; i < Object.keys(users).length; i++) {
          // await console.log(already_logged_in_user)

  //Identify loged in users and check thet the user has already logged in
          let arr=Object.values(already_logged_in_user)
          var array = [users[i][0],users[i][1]],
              prizes = arr,
              includes = prizes.some(a => array.every((v, i) => v === a[i]));
          if(includes){
            console.log( users[i][0] + "   User already logged in")

          }else{
              already_logged_in_user[i]= [users[i][0],users[i][1]]
          }
  //End Identify loged in users


          await cluster.queue({[i]:users[i],i:i});
        }
      await cluster.idle();
      await cluster.close();


      }catch(e){
      //  await page.screenshot({path:'error.png'})
        logger.error(e)
        next(e)
      }         
{}    }
    
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
// async function newPageWithNewContext(browser) {
//   const {browserContextId} = await browser._connection.send('Target.createBrowserContext');
//   const page = await browser._createPageInContext(browserContextId);
//   page.browserContextId = browserContextId;
//   return page;
// }

const CDP = require('chrome-remote-interface');

// async function closePage(browser, page) {
//   if (page.browserContextId != undefined) {
//     await browser._connection.send('Target.disposeBrowserContext', {browserContextId: page.browserContextId});
//   } else {
//     await page.close();
//   }
// }

