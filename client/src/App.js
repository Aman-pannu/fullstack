import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5001/records';

function App() {
  const [formData, setFormData] = useState({ field1: '', field2: '', field3: '', field4: '' });
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(() => setError('Failed to fetch records'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => Object.values(formData).every(v => v.trim !== '');

  const handleSave = () => {
    if (!validateForm()) {
      setError('All fields are required.');
      return;
    }

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(() => {
      setFormData({ field1: '', field2: '', field3: '', field4: '' });
      setEditId(null);
      return fetch(API_URL).then(res => res.json()).then(setRecords);
    })
    .catch(() => setError('Save operation failed'));
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditId(record._id || record.id);
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => fetch(API_URL).then(res => res.json()).then(setRecords))
      .catch(() => setError('Delete failed'));
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>4-Field CRUD Form</h2>
      <input name="field1" value={formData.field1} onChange={handleChange} placeholder="Field 1" /><br />
      <input name="field2" value={formData.field2} onChange={handleChange} placeholder="Field 2" /><br />
      <input name="field3" value={formData.field3} onChange={handleChange} placeholder="Field 3" /><br />
      <input name="field4" value={formData.field4} onChange={handleChange} placeholder="Field 4" /><br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSave}>{editId ? 'Update' : 'Save'}</button>

      <h3>Records</h3>
      <ul>
        {records.map((r) => (
          <li key={r._id || r.id}>
            {r.field1} | {r.field2} | {r.field3} | {r.field4}
            <button onClick={() => handleEdit(r)}>Edit</button>
            <button onClick={() => handleDelete(r._id || r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
