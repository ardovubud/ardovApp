import { QuoteMetadata, QuoteResponse } from '@ardovapp/bridge-controller';
import { BridgeStatusAction } from '@ardovapp/bridge-status-controller';
import { forceUpdateMetamaskState } from '../../store/actions';
import { submitRequestToBackground } from '../../store/background-connection';
import { ardovAppReduxDispatch } from '../../store/store';

const callBridgeStatusControllerMethod = <T extends unknown[]>(
  bridgeAction: BridgeStatusAction,
  args?: T,
) => {
  return async (dispatch: ardovAppReduxDispatch) => {
    await Promise.all([submitRequestToBackground(bridgeAction, args), forceUpdateMetamaskState(dispatch)]);
  };
};

export const submitBridgeTx = (
  quote: QuoteResponse & QuoteMetadata,
  isStxSupportedInClient: boolean,
) => {
  return async (dispatch: ardovAppReduxDispatch) => {
    dispatch(
      callBridgeStatusControllerMethod<[QuoteResponse & QuoteMetadata, boolean]>(BridgeStatusAction.SUBMIT_TX, [quote, isStxSupportedInClient]),
    );
  };
};
