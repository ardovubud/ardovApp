import * as React from 'react';
import { renderWithProvider, screen } from '../../../../../test/jest';
import configureStore from '../../../../store/store';
import testData from '../../../../../.storybook/test-data';

import DetectedTokenValues from './detected-token-values';

describe('DetectedTokenValues', () => {
  const args = {
    token: {
      address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
      symbol: 'SNX',
      decimals: 18,
      iconUrl:
        'https://assets.coingecko.com/coins/images/3406/large/SNX.png',
      aggregators: [
        'Aave', 
        'Bancor', 
        'CMC', 
        'Crypto.com', 
        'CoinGecko', 
        '1Inch', 
        'Paraswap',
        
