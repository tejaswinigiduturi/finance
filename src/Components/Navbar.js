import React from "react";

function Navbar({ user, setUser }) {
  return (
    <div className="navbar">
      <h2>Finance Dashboard</h2>

      <div>
        <select
          value={user.role}
          onChange={(e) =>
            setUser({ ...user, role: e.target.value })
          }
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;