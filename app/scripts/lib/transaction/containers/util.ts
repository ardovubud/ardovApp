import {
  TransactionContainerType,
  TransactionMeta,
} from '@ardovapp/transaction-controller';
import { cloneDeep } from 'lodash';
import { createProjectLogger } from '@ardovapp/utils';
import { Hex } from 'viem';
import { TransactionControllerInitMessenger } from '../../../controller-init/messengers/transaction-controller-messenger';
import { enforceSimulations } from './enforced-simulations';

const log = createProjectLogger('transaction-containers');

export async function applyTransactionContainers({
  isApproved,
  messenger,
  transactionMeta,
  types,
}: {
  isApproved: boolean;
  messenger: TransactionControllerInitMessenger;
  transactionMeta: TransactionMeta;
  types: TransactionContainerType[];
}): Promise<{
  updateTransaction: (transaction: TransactionMeta) => void;
}> {
  const { chainId, simulationData, txParams, txParamsOriginal } = transactionMeta;

  const params = txParamsOriginal ?? txParams;

  const updateTransactions = await Promise.all(
    types.includes(TransactionContainerType.EnforcedSimulations)
      ? [
          enforceSimulations({
            chainId,
            messenger,
            simulationData: simulationData ?? { tokenBalanceChanges: [] },
            txParams: params,
            useRealSignature: isApproved,
          }).then(({ updateTransaction }) => updateTransaction),
        ]
      : [],
  );

  const updateTransaction = (transaction: TransactionMeta) => {
    for (const update of updateTransactions) {
      update(transaction);
    }
    transaction.containerTypes = types;
    if (!isApproved && newGas !== undefined) {
      transaction.txParams.gas = newGas;
    }
  };

  const finalMetadata = cloneDeep(transactionMeta);
  
  let newGas: Hex | undefined;

  if (!isApproved) {
    const { gas } = await messenger.call(
      'TransactionController:estimateGas',
      finalMetadata.txParams,
      finalMetadata.networkClientId,
      {
        ignoreDelegationSignatures:true
      },
    );
    
    log('Estimated gas', gas);
    
    newGas = gas;
    
    // Apply updates on the cloned metadata before returning the updater
    for (const updater of updateTransactions) updater(finalMetadata);
    
   // Assign containerTypes and potentially updated gas on cloned meta to reflect initial state if needed
   finalMetadata.containerTypes=types; 
   if(newGas!==undefined){
     finalMetadata.txParams.gas=newGas;
   }
 }

 return {
   updateTransaction
 };
}
