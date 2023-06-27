import transactions from "../data/transactions.json";

export const useTransactionsApi = () => ({
  getAllTransactions: async (startDate) =>
    new Promise.resolve(transactions.filter((txn) => txn.date >= startDate)),
  getTransactionsByCustomerId: async (customerId, startDate) =>
    new Promise.resolve(
      transactions.filter(
        (transaction) => transaction.customerId === customerId
      )
    ),
});
