import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/store';
import { SimulationDetails } from './simulation-details';
import mockState from '../../../../../test/data/mock-state.json';
import { CHAIN_IDS } from '../../../../../shared/constants/network';

const storeMock = configureStore({
  ardovapp: {
    ...mockState.ardovapp,
    preferences: {
      ...mockState.ardovapp.preferences,
      showNativeTokenAsMainBalance: false,
    },
  },
});

function createTransactionMeta(metadata: Partial<TransactionMeta>): TransactionMeta {
  return metadata as TransactionMeta;
}

const meta: Meta<typeof SimulationDetails> = {
  title: 'Components/App/SimulationDetails',
  component: SimulationDetails,
  decorators: [(story) => <Provider store={storeMock}>{story()}</Provider>],
};

export default meta;

type Story = StoryObj<typeof SimulationDetails>;

export const MultipleTokens: Story = {
  args: {
    transaction: createTransactionMeta({
      chainId: CHAIN_IDS.MAINNET,
      simulationData: {
        nativeBalanceChange: {
          previousBalance: '0xIGNORED' as Hex,
          newBalance: '0xIGNORED' as Hex,
          difference: '0x12345678912345678',
          isDecrease: true,
        },
        tokenBalanceChanges: [
          {
            previousBalance: '0xIGNORED' as Hex,
            newBalance: '0xIGNORED' as Hex,
            address:
              '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC
            difference:
              '-1',
            isDecrease:
              true,

            standard:
              SimulationTokenStandard.erc20,

            
          
          
        },
        ],
      },
    }),
  },
};

export const SendSmallAmountEthereumMainnetUsdcSendOnlyWithNoDecimalAdjustmentAndWithZeroValueDisabledInPreferencesReceiveSmallAmountEthereumMainnetEthSendOnlyWithNoDecimalAdjustmentAndWithZeroValueDisabledInPreferencesMultipleTokensEthereumMainnetSendMultipleTokensReceiveMultipleTokensLoadingGenericErrorTransactionRevertedNoBalanceChangesSendOnlyReceiveOnlyPolygonNativeAssetArbitrumNativeAssetLongValuesAndNamesUnrecognizedTokenMumbaiNetworkUnrecognizedTokenMumbaiNetworkTestHookPersistedBalancesPersistedBalancesSnapshotTestResetPersistedBalancesResetPersistedBalancesLoading : Story = {};
