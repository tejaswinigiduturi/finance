import React, { useState } from "react";

function Transactions({ transactions, user, setTransactions }) {
    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        date: "",
        amount: "",
        category: "",
        type: "expense"
    });

    const categories = ["Food", "Travel", "Rent", "Salary", "Freelance", "Entertainment", "Utilities"];

    const filtered = transactions.filter(t =>
        t.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddTransaction = () => {
        if (newTransaction.date && newTransaction.amount && newTransaction.category) {
            const transaction = {
                id: transactions.length + 1,
                date: newTransaction.date,
                amount: parseFloat(newTransaction.amount),
                category: newTransaction.category,
                type: newTransaction.type
            };
            setTransactions([...transactions, transaction]);
            setNewTransaction({ date: "", amount: "", category: "", type: "expense" });
            setShowAddForm(false);
        }
    };

    return (
        <div className="transactions">
            <h3>Transactions</h3>

            <select value={search} onChange={(e) => setSearch(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {user && (
                <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>+ Add Transaction</button>
            )}

            {showAddForm && (
                <div className="add-form">
                    <input
                        type="date"
                        placeholder="Date"
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    />
                    <select
                        value={newTransaction.category}
                        onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={newTransaction.type}
                        onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <button onClick={handleAddTransaction}>Add</button>
                    <button onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(t => (
                        <tr key={t.id}>
                            <td>{t.date}</td>
                            <td>₹{t.amount}</td>
                            <td>{t.category}</td>
                            <td>{t.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;