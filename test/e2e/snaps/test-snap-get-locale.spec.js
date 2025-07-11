const { withFixtures, unlockWallet, WINDOW_TITLES } = require('../helpers');
const FixtureBuilder = require('../fixture-builder');
const { mockLocalizationSnap } = require('../mock-response-data/snaps/snap-binary-mocks');
const { TEST_SNAPS_WEBSITE_URL } = require('./enums');

describe('Test Snap Get Locale', function () {
  it('test snap_getLocale functionality', async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder().build(),
        testSpecificMock: mockLocalizationSnap,
        title: this.test.fullTitle(),
      },
      async ({ driver }) => {
        await unlockWallet(driver);
        
        await driver.openNewPage(TEST_SNAPS_WEBSITE_URL);
        
        // Wait for UI elements & connect to snap
        await Promise.all([
          driver.waitForSelector({ text: 'Installed Snaps', tag: 'h2' }),
          driver.clickElement('#connectgetlocale'),
          driver.delayFirefox(1000),
          (async () => {
            const button = await driver.findElement('#connectgetlocale');
            if (button) return;
            throw new Error('Connect button not found.');
          })(),
          
          // Connect flow inside Metamask Extension
          ...[{
              selector: { text: 'Connect', tag: 'button' },
              action() { return driver.clickElement(this.selector); }
            }, 
           ]},
         );

         // Finalize connection & check install status  
         const confirmClicksPromises = [
           [driver.waitForSelector({text:'Confirm'}), 
             ...(await sleep(750)),
             (...args) => args[0].click()], 

           [driver.waitForSelector({text:"OK",tag:"button"}), 
               (...args) => args[0].click()],
           
           [...[(await sleep(750))], () =>
                 void console.log("Waiting done")],
         
           [(await isStable()), ...[(await isStable())]],
            
         ];

       });

     });     
   });
 };
```
