import { useState } from "react";
import { useTransactionsApi } from "../api/transaction-api";

export const RewardCalculator = () => {
  const { getAllTransactions } = useTransactionsApi();
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);

  const loadTransactions = async () => {
    try {
      const response = await getAllTransactions();
      setTransactions(response);
    } catch (e) {}
  };

  return (
    <>
      {/* <label>
        Enter the number of past months for which you want to calulcate rewards
      </label>
      <input type="number" min={1} max={5} step={1} value={3} required /> */}
      <button onClick={loadTransaction}>Load Transactions</button>

      {!!transactions.length && (
        <>
          <h2>Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.date}</td>
                  <td>{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!!rewards.length && (
        <>
          <h2>Rewards</h2>
          <table>
            <thead>
              <tr>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward) => (
                <tr key={reward.customerId}>
                  <td>{reward.customerId}</td>
                  <td>{reward.past1Month}</td>
                  <td>{reward.past2Month}</td>
                  <td>{reward.past3Month}</td>
                  <td>{reward.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
