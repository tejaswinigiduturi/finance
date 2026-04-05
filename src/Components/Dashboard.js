import React from "react";

function Dashboard({ transactions, user, setTransactions }) {
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0);

    const balance = income - expense;
    const count = transactions.length;

    const [view, setView] = React.useState("expenses");
    const [search, setSearch] = React.useState("");

    // ✅ Delete a transaction by id
    const handleDelete = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const filtered = transactions.filter((t) => {
        if (view === "income" && t.type !== "income") return false;
        if (view === "expenses" && t.type !== "expense") return false;
        const q = search.toLowerCase();
        return (
            t.category.toLowerCase().includes(q) ||
            t.date.includes(q) ||
            String(t.amount).includes(q)
        );
    });

    return (
        <div className="dashboard-app">
            <section className="dashboard-center">
                <header className="dashboard-top">
                    <div className="dashboard-welcome">
                        <p>Welcome back{user && user.name ? `, ${user.name}` : ""}!</p>
                        <h1>Transactions</h1>
                    </div>
                    <div className="dashboard-top-actions">
                        <input
                            type="text"
                            placeholder="Search transactions"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="transaction-tabs">
                            <button
                                onClick={() => setView("expenses")}
                                className={view === "expenses" ? "selected" : ""}
                            >
                                Expenses
                            </button>
                            <button
                                onClick={() => setView("income")}
                                className={view === "income" ? "selected" : ""}
                            >
                                Income
                            </button>
                        </div>
                    </div>
                </header>

                <table className="dashboard-transactions">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Action</th>  {/* ✅ New column */}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((t) => (
                            <tr key={t.id}>
                                <td>{t.date}</td>
                                <td>{t.category}</td>
                                <td>{t.type === "expense" ? "-" : "+"}₹{t.amount}</td>
                                <td>{t.type}</td>
                                <td>
                                    {/* ✅ Delete button */}
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        style={{
                                            background: "none",
                                            border: "1px solid #e24b4a",
                                            color: "#e24b4a",
                                            borderRadius: "6px",
                                            padding: "4px 12px",
                                            cursor: "pointer",
                                            fontSize: "13px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <aside className="dashboard-summary">
                <div className="summary-card">
                    <h4>Wallet balance</h4>
                    <p>₹{balance}</p>
                </div>
                <div className="summary-card">
                    <h4>Total transactions</h4>
                    <p>{count}</p>
                </div>
                <div className="summary-card">
                    <h4>Income</h4>
                    <p>₹{income}</p>
                </div>
                <div className="summary-card">
                    <h4>Expenses</h4>
                    <p>₹{expense}</p>
                </div>
            </aside>
        </div>
    );
}

export default Dashboard;