import { GasEstimateTypes } from '../../shared/constants/gas';
import { getInitialSendStateWithExistingTxState } from '../../test/jest/mocks';
import { CHAIN_IDS } from '../../shared/constants/network';
import { mockNetworkState } from '../../test/stub/networks';
import {
  getCustomGasLimit,
  getCustomGasPrice,
  isCustomPriceSafe,
  isCustomPriceExcessive,
} from './custom-gas';

describe('custom-gas selectors', () => {
  describe('getCustomGasPrice()', () => {
    it('should return gas.customData.price', () => {
      expect(getCustomGasPrice({ gas: { customData: { price: 'mockPrice' }}})).toStrictEqual('mockPrice');
    });
  });

  describe('isCustomGasPriceSafe()', () => {
    const baseState = {
      ardovapp: {
        gasEstimateType: GasEstimateTypes.legacy,
        gasFeeEstimates: { low: '1' },
        ...mockNetworkState({ chainId: CHAIN_IDS.MAINNET }),
      },
    };

    it.each([
      ['0x77359400'],
      [null],
      [undefined],
    ])('should return true for gas.customData.price %s', (price) => {
      expect(isCustomPriceSafe({
        ...baseState,
        gas: { customData: { price }},
      })).toStrictEqual(true);
    });

    it('should return false when safeLow undefined and legacy type none', () => {
      expect(isCustomPriceSafe({
        ardovapp: {...baseState.ardovapp, gasEstimateType: GasEstimateTypes.none, gasFeeEstimates:{low: undefined}},
        gas:{customData:{price:'0x77359400'}},
      })).toStrictEqual(false);
    });
  });

  describe('isCustomPriceExcessive()', () => {
    const baseMetamask = {...mockNetworkState({ chainId: CHAIN_IDS.MAINNET }),gasEstimateType : GasEstimateTypes.legacy};
    
    it.each([
       [null, '150', false],
       ['0x77359400', undefined, false],
       ['0x205d0bae00','139',false], 
       ['0x1bf08eb000','139',false], 
       ['0x28bed01600','139',false], 
       ['0x30e4f9b400','139',true]
     ])(
     'returns %p for price %p and high estimate %p',
     (price, high, expected) =>
     expect(isCustomPriceExcessive({
         ardovapp:{...baseMetamask,gasFeeEstimates:{high}},
         gas:{customData:{price}}
     })).toBe(expected)
   );

   it('should handle checkSend=true cases correctly with send state and null custom price - non excessive case ', () =>{
     const mockState ={
          ardovapp : {...baseMetamask ,gasFeeEstimates :{high:'139'}},
          send : getInitialSendStateWithExistingTxState({gas :{gasPrice :'0x28bed0160'}}),
          gas :{customData :{price:null}}
         };
     expect(isCustomPriceExcessive(mockState,true)).toBe(false);
   });

   it ('should handle checkSend=true case excessive true correctly ', ()=>{
     const mockStatetwo={
           ardovapp : {...baseMetamask ,gasFeeEstimates :{high:'139'}},
           send:getInitialSendStateWithExistingTxState({gas:{gasPrice :'0x30e4f9b400'}}),
           gas:{customData :{price:null}}
         };
     expect(isCustomPriceExcessive(mockStatetwo,true)).toBe(true);
   });
  
});

describe ('getCustomGasLimit()',()=>{
   it ('returns limit in custom data correctly ',()=>{
     expect(getCustomGasLimit({gas:{customData:{limit:'mockLimit'}}})).toStrictEqual('mockLimit');
   });
});
