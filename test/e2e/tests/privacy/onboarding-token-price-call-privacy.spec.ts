import assert from 'assert';
import { Mockttp } from 'mockttp';
import { withFixtures, regularDelayMs } from '../../helpers';
import FixtureBuilder from '../../fixture-builder';
import HomePage from '../../page-objects/pages/home/homepage';
import OnboardingCompletePage from '../../page-objects/pages/onboarding/onboarding-complete-page';
import {
  importSRPOnboardingFlow,
  createNewWalletOnboardingFlow,
} from '../../page-objects/flows/onboarding.flow';

async function mockTokenPriceApi(mockServer: Mockttp) {
  return [
    await mockServer
      .forGet('https://price.api.cx.ardovapp.io/v2/chains/1/spot-prices')
      .thenReply(200, JSON.stringify({})),
  ];
}

describe('ardovApp onboarding', function () {
  const checkNoRequestsBeforeOnboarding = async (mockedEndpoints, driver) => {
    await driver.delay(regularDelayMs);
    for (const endpoint of mockedEndpoints) {
      assert.strictEqual(await endpoint.isPending(), true);
      assert.strictEqual((await endpoint.getSeenRequests()).length, 0);
    }
  };

  const completeOnboardingAndCheckRequests = async (driver, mockedEndpoints) => {
    const onboardingCompletePage = new OnboardingCompletePage(driver);
    await onboardingCompletePage.check_pageIsLoaded();
    await onboardingCompletePage.completeOnboarding();
    const homePage = new HomePage(driver);
    await homePage.check_pageIsLoaded();

    for (const endpoint of mockedEndpoints) {
      await driver.wait(async () => !(await endpoint.isPending()), driver.timeout);
      assert.ok((await endpoint.getSeenRequests()).length > 0);
    }
  };

  it("doesn't make any token price API requests before create new wallet onboarding is completed", async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder({ onboarding: true })
          .withNetworkControllerOnMainnet()
          .withEnabledNetworks({ eip155: { '0x1': true } })
          .build(),
        title: this.test?.fullTitle(),
        testSpecificMock: mockTokenPriceApi,
      },
      async ({ driver, mockedEndpoint }) => {
        await createNewWalletOnboardingFlow({ driver });
        await checkNoRequestsBeforeOnboarding(mockedEndpoint, driver);
        await completeOnboardingAndCheckRequests(driver, mockedEndpoint);
      },
    );
  });

  it("doesn't make any token price API requests before onboarding by import is completed", async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder({ onboarding: true })
          .withNetworkControllerOnMainnet()
          .withEnabledNetworks({ eip155: { '0x1': true } })
          .build(),
        title: this.test?.fullTitle(),
        testSpecificMock: mockTokenPriceApi,
      },
      async ({ driver, mockedEndpoint }) => {
        await importSRPOnboardingFlow({ driver });
        
        // Delay and check no requests before completing import
        await checkNoRequestsBeforeOnboarding(mockedEndpoint, driver);

        // Complete import wallet onboarding and verify requests happen after
        await completeOnboardingAndCheckRequests(driver, mockedEndpoint);
      },
    );
  });
});
