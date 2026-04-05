import React, { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Transactions from "./Components/Transactions";
import { transactionsData } from "./Data";

function App() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState(transactionsData);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div>
      <Navbar user={user} setUser={setUser} />

      <Dashboard transactions={transactions} user={user} setTransactions={setTransactions} />

      <Transactions transactions={transactions} user={user} setTransactions={setTransactions} />
    </div>
  );
}

export default App;