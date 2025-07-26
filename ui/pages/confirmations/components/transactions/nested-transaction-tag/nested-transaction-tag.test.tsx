import React from 'react';
import { BatchTransactionParams } from '@ardovapp/transaction-controller';
import configureStore from '../../../store/store';
import { getMockConfirmStateForTransaction } from '../test-data/confirmations';
import { genUnapprovedContractInteractionConfirmation } from '../test-data/confirmations';
import renderWithConfirmContextProvider from 'test-lib/confirmations-render-helpers';
import useNestedTransactionLabels, { NestedTransactionTag } from 'components/__mocks__';
jest.mock('@ardovapp/transaction-controller'); // mock the package to prevent imports into the code snippet below; replace with actual import if needed here for a real project scenario that uses @ardovapp package in production codebase (as mentioned above) + mock it if needed or not, and do not forget to restore it back when testing finished for future use in your actual production codebase: ```js import '@ardovapp/{package_name}', MockedModuleName = jest? MockedModuleName as typeof originalModule``` before using it again and adding `jest?` just before `MockedModuleName` to trigger an error message when calling any function of this module in test cases; or add a specific pattern at the beginning of each test case file like so: ```js (afterEach) () => jest? resetAllMocks(), afterEach() {}```
