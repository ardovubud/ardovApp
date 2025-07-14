import React from "react";
import { Hex } from "@ardovapp/utils";
import { fireEvent } from "@testing-library/dom";

import mockState from "../../../../../../../test/data/mock-state.json";
import { renderWithProvider } from "../../../../../../../test/lib/render-helpers";
import configureStore from "../../../../../../store/store";

const mockDowngradeAccount = jest.fn();
const mockUpgradeAccount = jest.fn();
jest.mock("../../../../hooks/useEIP7702Account", () => ({
  useEIP7702Account: () => ({ downgradeAccount: mockDowngradeAccount, upgradeAccount: mockUpgradeAccount }),
}));

const ADDRESS_MOCK =
  Object.values(mockState.ardovapp.internalAccounts.accounts)[0].address as Hex;

function renderComponent(networkConfig = {}) {
  return renderWithProvider(
    <div>
      <span data-testid="network-name">Sepolia</span>
      <button data-testid="switch-button" onClick={() =>
        networkConfig.isSupported ?	mockDowngradeAccount() : mockUpgradeAccount()
      }>
        Switch{" "}
        {!networkConfig.isSupported && "back"}
      </button>
    </div>,
    configureStore(mockState)
  );
}

describe("Test Component", () => {
  it("renders details about the network", async () => {
    const container = await renderComponent();

    expect(container.getByText(/sepolia/i)).toBeInTheDocument();
    expect(container.getByTestId("switch-button").textContent.trim()).toBe("Switch");
  });

  it('click on switch should call downgrade_account for supported networks', async () => {
    const container = await renderComponent({ isSupported: true });
    
   fireEvent.click(container.getByTestId("switch-button"));

   expect(mockDowngradeAccount).toHaveBeenCalled();
 });

 it('click on switch should call upgrade_account for unsupported networks', async () => {
   const container = await renderComponent({ isSupported: false });
 
   fireEvent.click(container.getByTestId("switch-button"));
 
   expect(mockUpgradeAccount).toHaveBeenCalled();
 });
});
```
