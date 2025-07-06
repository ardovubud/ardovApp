/* eslint-disable jest/no-conditional-expect */
import { TransactionStatus } from '@ardovapp/transaction-controller';
import data from '../first-time-state';
import migration25 from './025';

const firstTimeState = { meta: {}, data };
const storage = {
  meta: {},
  data: {
    TransactionController: {
      transactions: Array.from({ length: 11 * 2 }, (_, i) => 
        i % 2 === 0
          ? {
              txParams: { from: '0x8acce2391c0d510a6c5e5d8f819a678f79b7e675' },
              status: TransactionStatus.confirmed,
            }
          : {
              txParams: {
                from: '0x8acce2391c0d510a6c5e5d8f819a678f79b7e675',
                chainId: undefined,
                random: undefined,
              },
              status: TransactionStatus.unapproved,
            }
      ),
    },
  },
};

describe('storage is migrated successfully and the txParams.from are lowercase', () => {
  it('should lowercase the from for unapproved txs', async () => {
    const migratedData = await migration25.migrate(storage);
    const migratedTransactions =
      migratedData.data.TransactionController.transactions;
    migratedTransactions.forEach((tx) => {
      if (tx.status === TransactionStatus.unapproved) {
        expect(tx.txParams.random).toBeUndefined();
        expect(tx.txParams.chainId).toBeUndefined();
      }
    });
  });

  it('should migrate first time state', async () => {
    const migratedData = await migration25.migrate(firstTimeState);
    expect(migratedData.meta.version).toStrictEqual(25);
  });
});
