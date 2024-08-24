import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTransactions } from "../hooks/useBanking";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: transactions, isLoading } = useTransactions(user?.id ?? 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="mb-4">
          <span className="font-bold">Username:</span> {user?.username}
        </div>
        <div className="mb-4">
          <span className="font-bold">Account Balance:</span> $1000
        </div>
        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {transactions?.map((tx: any) => (
              <li key={tx.id}>
                {tx.type} of ${tx.amount} on {tx.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
