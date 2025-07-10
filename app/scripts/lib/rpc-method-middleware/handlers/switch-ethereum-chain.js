import { providerErrors } from '@ardovapp/rpc-errors';
import { isSnapId } from '@ardovapp/snaps-utils';

import { MESSAGE_TYPE } from '../../../../../shared/constants/app';
import {
  validateSwitchEthereumChainParams,
  switchChain,
} from './ethereum-chain-utils';

const switchEthereumChain = {
  methodNames: [MESSAGE_TYPE.SWITCH_ETHEREUM_CHAIN],
  implementation: switchEthereumChainHandler,
  hookNames: {
    getNetworkConfigurationByChainId: true,
    setActiveNetwork: true,
    requestUserApproval: true,
    getCaveat: true,
    getCurrentChainIdForDomain: true,
    requestPermittedChainsPermissionIncrementalForOrigin: true,
    rejectApprovalRequestsForOrigin: true,
    setTokenNetworkFilter: true,
    setEnabledNetworks: true,
    hasApprovalRequestsForOrigin: true,
  },
};

export default switchEthereumChain;

async function switchEthereumChainHandler(
  req, res, _next, end, hooks
) {
  let chainId;
  try {
    chainId = validateSwitchEthereumChainParams(req);
  } catch (error) {
    return end(error);
  }

  const { origin } = req;
  const currentChainIdForOrigin = hooks.getCurrentChainIdForDomain(origin);
  
  if (currentChainIdForOrigin === chainId) {
    res.result = null;
    return end();
  }

  const toConfig = hooks.getNetworkConfigurationByChainId(chainId);
  
  if (!toConfig?.rpcEndpoints?.[toConfig.defaultRpcEndpointIndex]?.networkClientId) {
      return end(providerErrors.custom({
        code: 4902,
        message:
          `Unrecognized chain ID "${chainId}". Try adding the chain using ${MESSAGE_TYPE.ADD_ETHEREUM_CHAIN} first.`,
      }));
   }
  
   const networkClientToSwitchTo =
     toConfig.rpcEndpoints[toConfig.defaultRpcEndpointIndex].networkClientId;

   const fromConfig = hooks.getNetworkConfigurationByChainId(currentChainIdForOrigin);

   return switchChain(res, end, chainId, networkClientToSwitchTo, {
     origin,
     isSwitchFlow:true ,
     autoApprove:isSnapId(origin),
     ...hooks ,
     toNetworkConfiguration : toConfig ,
     fromNetworkConfiguration :fromConfig 
   });
}
