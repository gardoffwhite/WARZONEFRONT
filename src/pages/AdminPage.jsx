import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/logs`)
      .then(res => res.json())
      .then(setLogs);

    fetch(`${import.meta.env.VITE_API_URL}/admin/users`)
      .then(res => res.json())
      .then(setUsers);

    fetch(`${import.meta.env.VITE_API_URL}/admin/items`)
      .then(res => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Logs</h2>
        <ul className="list-disc pl-5">
          {logs.map((log, i) => (
            <li key={i}>
              [{log.timestamp}] {log.username} (Character: {log.characterName}) drew {log.itemName}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Users</h2>
        <ul className="list-disc pl-5">
          {users.map(user => (
            <li key={user._id}>{user.username} - Tokens: {user.tokens}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Items</h2>
        <ul className="list-disc pl-5">
          {items.map(item => (
            <li key={item._id}>
              {item.name} - Chance: {item.chance}%
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminPage;
