const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
import Agent from "../models/Agent";
import Office from "../models/Office";
const { Builder, By } = require("selenium-webdriver");
const { Cluster } = require("puppeteer-cluster");
const { logger } = require("../utils/logger");
export class amWinsController {

  static async doInNewContext(action) {
    // fetch the browser version (since Chrome 62 the browser target URL is
    // generated at runtime and can be obtained via the '/json/version'
    // endpoint, fallback to '/devtools/browser' if not present)
    const { webSocketDebuggerUrl } = await CDP.Version();
    // connect to the DevTools special target
    const browser = await CDP({
      target: webSocketDebuggerUrl || "ws://localhost:9222/devtools/browser",
    });
    
    // create a new context
    const { Target } = browser;
    const { browserContextId } = await Target.createBrowserContext();
    const { targetId } = await Target.createTarget({
      url: "about:blank",
      browserContextId,
    });

    // connct to the new context
    const client = await CDP({ target: targetId });

    // perform user actions on it
    try {
      await action(client);
    } finally {
      // cleanup
      await Target.closeTarget({ targetId });
      await browser.close();
    }
  }

  static async getPolicyInfo(req, res, next) {
    const Username = req.query.username;
    const company = req.query.product;
    let UserID;
    let Password;
    let companyToFetch;
    try {
      const agentData: any = await Agent.findOne({ Username: Username });
      console.log("agentData", agentData);
      const officeData: any = await Office.findOne({
        IslandName: agentData.OfficeIsland,
      });
      
      const companyCredentials = officeData.insurance_site_credentials;
      
      console.log(companyCredentials);

      UserID = companyCredentials.AAAA.login;
      console.log("userID", UserID);
      Password = companyCredentials.AAAA.password;
      console.log("password", Password);
    } catch (e) {
      throw new Error(e);
    }

    const already_logged_in_user = {};
    const drivers = [];
    const vehicles= [];

    //10000= 10s
    const outhTime = 3600000;

    const users = {
      //username     password       policyNumber
      0: [UserID, Password, req.query.Policy],
     // 1: ["BUCKNEfffRS", "csrsbuckner", "HTG01006630"],
    };
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,

      //same time  open 6 tab in browser and didn't share sessions
      maxConcurrency: 2,
      timeout: 3600000,
    });


    try {
      if (req.setTabStatus == "use same session") {
        logger.info("using different browser session");
        // console.log("using same browser context");
        //start web scrappping
        //const browser = await puppeteer.launch({headless:false});
        //const page = await browser.newPage();
        //const page = await browser.newPage({ context: 'another-context' }); // creates a page in another browser context
        //const data = await page.goto('http://127.0.0.1:9222/json/version',{waitUntil: 'load', timeout: 0});
        //let test = JSON.stringify(data)
        await cluster.task(async ({ page, data: url }) => {
          if (url.same == false) {
            await page.goto(
              "https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch",
              { waitUntil: "load" }
            );
            await page.type('input[ name="wl_user_name"]', url[url['i']][0]);
  
            await page.type('input[name="wl_user_password"]',url[url['i']][1]);
            await page.waitForSelector('input[type=submit]');
            const inputElement = await page.$('input[type=submit]');
            await inputElement.click();
          }
          

          try {
              await page.waitForSelector('input[name="policyNumber"]')
              await page.type('input[name="policyNumber"]',url[url['i']][2]);
              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
              const elements = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
              await elements[0].click()
                     try{
                         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody')
                         const Policy = await page.evaluate(() => {
                               const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr'))
                          
                               return tds.map(td =>td)
                             });
                            // console.log(Policy.length+1,858585)
                            for (var g = 3; g < Policy.length+1; g++) {
                              const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr['+g+']')
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
                             //
                             // //----------------------Drivers: ----------------------
                             await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody')
                             const Drivers = await page.evaluate(() => {
                                   const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td'))
                                   return  tds.map(td => td.textContent.trim( ))
                                 });
                              for (var i = 6; i < Drivers.length; i=i+5) {
                                console.log('Driver #: '+Drivers[i])
                                console.log("Name : "+ Drivers[i+1])
                                console.log("Type : "+ Drivers[i+2])
                                console.log("Date of Birth : "+ Drivers[i+3])
                                console.log("Gender : "+ Drivers[i+4])
                                console.log("              " )
                                drivers.push({
                                'Driver # ':Drivers[i],
                                "Name ": Drivers[i+1],
                                "Type ": Drivers[i+2],
                                "Date of Birth  ": Drivers[i+3],
                                "Gender ": Drivers[i+4],
                               'linkcontent':{}
                                })
                              }
                              
                              const Driverslink = await page.evaluate(() => {
                                    const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td > a'))
                                    return tds.map(td => td.getAttribute('href'))
                                  });
                             
                                  // console.log(Driverslink)
                                for (var i = 0; i < Driverslink.length; i++) {
                                        await page.goto('https://osis.amwinsauto.com/policyaccess/'+Driverslink[i])
                                         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table')
                                            let Driverslinkcontent = await page.evaluate(() => {
                                                  let tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td'))
                                                  return tds.map(td => td.textContent.trim( ))
                                                });                                             
                                                for (var j = 0; j < Driverslinkcontent.length; j=j+2) {
                                                      console.log(Driverslinkcontent[j] +" : "+Driverslinkcontent[j+1] )
                                                    //  console.log(drivers,141414)
                                                      drivers[i].linkcontent[Driverslinkcontent[j]]=Driverslinkcontent[j+1]
                                                }
                                       console.log("      " )
                                 }
                                 await page.goto('https://osis.amwinsauto.com/policyaccess/polsum.php?POL_NUM='+url[url['i']][2])
                             //----------------------End Drivers: ----------------------
                             
                             //  //----------------------Vehicle: ----------------------
                               await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody')
                               const Vehicle = await page.evaluate(() => {
                                     const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > table > tbody > tr > td'))
                                     return tds.map(td => td.textContent.trim( ))
                                   });
                                for (var i = 7; i < Vehicle.length; i=i+6) {
                                  console.log('Vehicle #: '+Vehicle[i])
                                  console.log("Year : "+ Vehicle[i+1])
                                  console.log("Make : "+ Vehicle[i+2])
                                  console.log("Model : "+ Vehicle[i+3])
                                  console.log("VIN : "+ Vehicle[i+4])
                                  console.log("Territory : "+ Vehicle[i+5])
                                  console.log("              ")
                                  vehicles.push(
                                    {
                                      'Vehicle # ':Vehicle[i],
                                      "Year  ":Vehicle[i+1],
                                      "Make ":Vehicle[i+2],
                                      "Model ":Vehicle[i+3],
                                      "VIN ":Vehicle[i+4],
                                      "Territory ":Vehicle[i+5],
                                      'linkcontent':{}

                                    }
                                  )

                                }
                                const Vehiclelink = await page.evaluate(() => {
                                      const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > table > tbody > tr > td > a'))
                                      return tds.map(td => td.getAttribute('href'))
                                    });
                               for (var i = 0; i < Vehiclelink.length; i++) {
                                       await page.goto('https://osis.amwinsauto.com/policyaccess/'+Vehiclelink[i])
                                        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/div/table/tbody')
                                           let Vehiclelinkcontent = await page.evaluate(() => {
                                                 let tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr > td'))
                                                 return tds.map(td => td.textContent.trim( ))
                                               });
                                               for (var j = 0; j < Vehiclelinkcontent.length; j=j+5) {
                                               
                                                     console.log(Vehiclelinkcontent[j] +"  "+Vehiclelinkcontent[j+1] +" " +Vehiclelinkcontent[j+2]+" " +Vehiclelinkcontent[j+3] +" " +Vehiclelinkcontent[j+4]+" " +Vehiclelinkcontent[j+5])
                                         
                                              vehicles[i].linkcontent[Vehiclelinkcontent[j]]="'"+Vehiclelinkcontent[j+1] +" " +Vehiclelinkcontent[j+2]+" " +Vehiclelinkcontent[j+3] +" " +Vehiclelinkcontent[j+4]+" " +Vehiclelinkcontent[j+5]+"'"

                                                    }
                                      console.log("      " )
                                }
                                  await page.goto('https://osis.amwinsauto.com/policyaccess/polsum.php?POL_NUM='+url[url['i']][2])
                                 //----------------------End Vehicle: ----------------------
                               //----------------------Make Payment ----------------------
                               await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td/form/table/tbody/tr[2]/td/input')
                               const make = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td/form/table/tbody/tr[2]/td/input')
                               await make[0].click()
                               await page.waitForXPath('/html/body/form/table[1]/tbody/tr[4]/td/table/tbody/tr/td/table/tbody')
                               const make1 = await page.$x('/html/body/form/table[1]/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]', e => e.innerText);
                               let maketext1= await page.evaluate(h1 => h1.textContent.trim( ), make1[0]);
                               await page.type('#pmt_amt_oth_field','55');
                              console.log("INSURED'S NAME: "+maketext1)
                               console.log("         ")
                                console.log("Done ")
                                await page.goto('https://osis.amwinsauto.com/policyaccess/polsum.php?POL_NUM='+url[url['i']][2])
                                if(drivers.length==0){
                                  console.log('drivers data isnt')
                                  drivers.push({'error':"data is not excist"})
                                }
                                if(vehicles.length==0){
                                  console.log('vehicles data isnt')
                                  vehicles.push({'error':"data is not excist"})
                                }

                                  await res.send({
                                            data: {
                                              Status: status,
                                              "Policy Term": policy,
                                              "Effective Date": effective,
                                              "Expiration Date": expiration,
                                              "Inception Date": inception,
                                              Finance: {
                                                Financ1: Financ1,
                                                Financtext2: Financtext2,
                                                Financtext3: Financtext3,
                                              },
                                              Driver: drivers,
                                              
                                              Vehicle: vehicles
                                            
                                            },
                                          });
                          }
              //End get status data
              //wait 30min and logout
              await new Promise((r) => setTimeout(r, outhTime));
              await page.waitForXPath(
                '//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font'
              );
             
              console.log("           ");
            } catch (error) {
              //check if  policy number is invalid
              await page.screenshot({
                path: url[url["i"]][0] + "_" + new Date().getTime() + ".png",
              });
              console.log("Invalid policy number : " + url[url["i"]][2]);

              console.log("           ");
            }
          } catch (error) {
            console.log(
              "Username : " +
                url[url["i"]][0] +
                " Password : " +
                url[url["i"]][1] +
                " is invalid"
            );
            await page.screenshot({
              path: url[url["i"]][0] + "_" + new Date().getTime() + ".png",
            });
            console.log("           ");
          }
        });

        // await page.screenshot({path:'error.png'})
        // logger.info("using different browser session",data)
        // console.log("using same session",data)

        //end web scrapping
      } else if (req.setTabStatus == "create new session") {
        logger.info("using different browser session");
        // const browser = await puppeteer.launch({headless:false});
        // var page = await browser.newPage({ context: 'another-context' }); // creates a page in another browser context
        // const data = await page.goto('http://127.0.0.1:9222/json/version',{waitUntil: 'load', timeout: 0});
        // page.bringtoFront()
        //let test = JSON.stringify(data)

        await cluster.task(async ({ page, data: url }) => {
          if (url.same == false) {
            await page.goto(
              "https://osis.amwinsauto.com/prod/index.php?page=policyAccess&subPage=policySearch",
              { waitUntil: "load" }
            );
            await page.type('input[ name="wl_user_name"]', url[url['i']][0]);
  
            await page.type('input[name="wl_user_password"]',url[url['i']][1]);
            await page.waitForSelector('input[type=submit]');
            const inputElement = await page.$('input[type=submit]');
            await inputElement.click();
          }
          

          try {
              await page.waitForSelector('input[name="policyNumber"]')
              await page.type('input[name="policyNumber"]',url[url['i']][2]);
              await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
              const elements = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr/td[3]/input')
              await elements[0].click()
                     try{
                         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody')
                         const Policy = await page.evaluate(() => {
                               const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr'))
                          
                               return tds.map(td =>td)
                             });
                            // console.log(Policy.length+1,858585)
                            for (var g = 3; g < Policy.length+1; g++) {
                              const response = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr['+g+']')
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
                             //
                             // //----------------------Drivers: ----------------------
                             await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody')
                             const Drivers = await page.evaluate(() => {
                                   const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td'))
                                   return  tds.map(td => td.textContent.trim( ))
                                 });
                              for (var i = 6; i < Drivers.length; i=i+5) {
                                console.log('Driver #: '+Drivers[i])
                                console.log("Name : "+ Drivers[i+1])
                                console.log("Type : "+ Drivers[i+2])
                                console.log("Date of Birth : "+ Drivers[i+3])
                                console.log("Gender : "+ Drivers[i+4])
                                console.log("              " )
                                drivers.push({
                                'Driver # ':Drivers[i],
                                "Name  ": Drivers[i+1],
                                "Type  ": Drivers[i+2],
                                "Date of Birth ": Drivers[i+3],
                                "Gender ": Drivers[i+4],
                               'linkcontent':{}
                                })
                              }
                              
                              const Driverslink = await page.evaluate(() => {
                                    const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td > a'))
                                    return tds.map(td => td.getAttribute('href'))
                                  });
                             
                                  // console.log(Driverslink)
                                for (var i = 0; i < Driverslink.length; i++) {
                                        await page.goto('https://osis.amwinsauto.com/policyaccess/'+Driverslink[i])
                                         await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table')
                                            let Driverslinkcontent = await page.evaluate(() => {
                                                  let tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td'))
                                                  return tds.map(td => td.textContent.trim( ))
                                                });                                             
                                                for (var j = 0; j < Driverslinkcontent.length; j=j+2) {
                                                      console.log(Driverslinkcontent[j] +" : "+Driverslinkcontent[j+1] )
                                                    //  console.log(drivers,141414)
                                                      drivers[i].linkcontent[Driverslinkcontent[j]]=Driverslinkcontent[j+1]
                                                }
                                       console.log("      " )
                                 }
                                 await page.goto('https://osis.amwinsauto.com/policyaccess/polsum.php?POL_NUM='+url[url['i']][2])
                             //----------------------End Drivers: ----------------------
                             
                             //  //----------------------Vehicle: ----------------------
                               await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td/table/tbody')
                               const Vehicle = await page.evaluate(() => {
                                     const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > table > tbody > tr > td'))
                                     return tds.map(td => td.textContent.trim( ))
                                   });
                                for (var i = 7; i < Vehicle.length; i=i+6) {
                                  console.log('Vehicle #: '+Vehicle[i])
                                  console.log("Year : "+ Vehicle[i+1])
                                  console.log("Make : "+ Vehicle[i+2])
                                  console.log("Model : "+ Vehicle[i+3])
                                  console.log("VIN : "+ Vehicle[i+4])
                                  console.log("Territory : "+ Vehicle[i+5])
                                  console.log("              ")
                                  vehicles.push(
                                    {
                                      'Vehicle # ':Vehicle[i],
                                      "Year  ":Vehicle[i+1],
                                      "Make ":Vehicle[i+2],
                                      "Model ":Vehicle[i+3],
                                      "VIN ":Vehicle[i+4],
                                      "Territory ":Vehicle[i+5],
                                      'linkcontent':{}

                                    }
                                  )

                                }
                                const Vehiclelink = await page.evaluate(() => {
                                      const tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > table > tbody > tr > td > a'))
                                      return tds.map(td => td.getAttribute('href'))
                                    });
                               for (var i = 0; i < Vehiclelink.length; i++) {
                                       await page.goto('https://osis.amwinsauto.com/policyaccess/'+Vehiclelink[i])
                                        await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/div/table/tbody')
                                           let Vehiclelinkcontent = await page.evaluate(() => {
                                                 let tds = Array.from(document.querySelectorAll('#content_container > div > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > div > table > tbody > tr > td'))
                                                 return tds.map(td => td.textContent.trim( ))
                                               });
                                               for (var j = 0; j < Vehiclelinkcontent.length; j=j+5) {
                                               
                                                     console.log(Vehiclelinkcontent[j] +"  "+Vehiclelinkcontent[j+1] +" " +Vehiclelinkcontent[j+2]+" " +Vehiclelinkcontent[j+3] +" " +Vehiclelinkcontent[j+4]+" " +Vehiclelinkcontent[j+5])
                                         
                                              vehicles[i].linkcontent[Vehiclelinkcontent[j]]="'"+Vehiclelinkcontent[j+1] +" " +Vehiclelinkcontent[j+2]+" " +Vehiclelinkcontent[j+3] +" " +Vehiclelinkcontent[j+4]+" " +Vehiclelinkcontent[j+5]+"'"

                                                    }
                                      console.log("      " )
                                }
                                  await page.goto('https://osis.amwinsauto.com/policyaccess/polsum.php?POL_NUM='+url[url['i']][2])
                                 //----------------------End Vehicle: ----------------------
                               //----------------------Make Payment ----------------------
                               await page.waitForXPath('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td/form/table/tbody/tr[2]/td/input')
                               const make = await page.$x('//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td/form/table/tbody/tr[2]/td/input')
                               await make[0].click()
                               await page.waitForXPath('/html/body/form/table[1]/tbody/tr[4]/td/table/tbody/tr/td/table/tbody')
                               const make1 = await page.$x('/html/body/form/table[1]/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]', e => e.innerText);
                               let maketext1= await page.evaluate(h1 => h1.textContent.trim( ), make1[0]);
                               await page.type('#pmt_amt_oth_field','55');
                              console.log("INSURED'S NAME: "+maketext1)
                               console.log("         ")
                                console.log("Done ")
                                await page.goto('https://osis.amwinsauto.com/policyaccess/polsum.php?POL_NUM='+url[url['i']][2])
                                if(drivers.length==0){
                                  console.log('drivers data isnt')
                                  drivers.push({'error':"data is not excist"})
                                }
                                if(vehicles.length==0){
                                  console.log('vehicles data isnt')
                                  vehicles.push({'error':"data is not excist"})
                                }

                                  await res.send({
                                            data: {
                                              Status: status,
                                              "Policy Term": policy,
                                              "Effective Date": effective,
                                              "Expiration Date": expiration,
                                              "Inception Date": inception,
                                              Finance: {
                                                Financ1: Financ1,
                                                Financtext2: Financtext2,
                                                Financtext3: Financtext3,
                                              },
                                              Driver: drivers,
                                              
                                              Vehicle: vehicles
                                            
                                            },
                                          });
                          }
              //End get status data
              //wait 30min and logout
              await new Promise((r) => setTimeout(r, outhTime));
              await page.waitForXPath(
                '//*[@id="content_container"]/div/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table/tbody/tr/td/font'
              );
             
              console.log("           ");
            } catch (error) {
              //check if  policy number is invalid
              await page.screenshot({
                path: url[url["i"]][0] + "_" + new Date().getTime() + ".png",
              });
              console.log("Invalid policy number : " + url[url["i"]][2]);

              console.log("           ");
            }
          } catch (error) {
            console.log(
              "Username : " +
                url[url["i"]][0] +
                " Password : " +
                url[url["i"]][1] +
                " is invalid"
            );
            await page.screenshot({
              path: url[url["i"]][0] + "_" + new Date().getTime() + ".png",
            });
            console.log("           ");
          }
        });

        // await page.screenshot({path:'error.png'})
        // logger.info("using different browser session",data)
      }
      for (var i = 0; i < Object.keys(users).length; i++) {
        // await console.log(already_logged_in_user)

        //Identify loged in users and check thet the user has already logged in
        let arr = Object.values(already_logged_in_user);
        var array = [users[i][0], users[i][1]],
          prizes = arr,
          includes = prizes.some((a) => array.every((v, i) => v === a[i]));
        if (includes) {
          console.log(users[i][0] + "   User already logged in");
          await cluster.queue({ [i]: users[i], i: i, same: true });
        } else {
          already_logged_in_user[i] = [users[i][0], users[i][1]];
          await cluster.queue({ [i]: users[i], i: i, same: false });
        }
        //End Identify loged in users
      }
      await cluster.idle();
      await cluster.close();
    } catch (e) {
      //  await page.screenshot({path:'error.png'})
      logger.error(e);
      next(e);
    }
    {
    }
  }

  // this basically is the usual example
  static async example(client) {
    // extract domains
    const { Network, Page } = client;
    // setup handlers
    Network.requestWillBeSent((params) => {
      console.log(params.request.url);
    });
    // enable events then start!
    await Promise.all([Network.enable(), Page.enable()]);
    await Page.navigate({ url: "https://github.com" });
    await Page.loadEventFired();
  }
}
// async function newPageWithNewContext(browser) {
//   const {browserContextId} = await browser._connection.send('Target.createBrowserContext');
//   const page = await browser._createPageInContext(browserContextId);
//   page.browserContextId = browserContextId;
//   return page;
// }

const CDP = require("chrome-remote-interface");

// async function closePage(browser, page) {
//   if (page.browserContextId != undefined) {
//     await browser._connection.send('Target.disposeBrowserContext', {browserContextId: page.browserContextId});
//   } else {
//     await page.close();
//   }
// }
