import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    Promise.all([
      api.get('/admin/users'),
      api.get('/admin/stats'),
    ]).then(([usersRes, statsRes]) => {
      setUsers(usersRes.data.users || []);
      setStats(statsRes.data.stats || {});
    }).catch(() => toast.error('Could not load admin data'))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const { data } = await api.patch(`/admin/users/${id}/role`, { role });
      setUsers(prev => prev.map(u => u.id === id ? data.user : u));
      toast.success('Role updated');
    } catch {
      toast.error('Could not update role');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this user? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('User removed');
    } catch {
      toast.error('Could not remove user');
    }
  };

  const filtered = filter === 'all' ? users : users.filter(u => u.role === filter);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Admin Panel</h1>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{stats.users || 0}</span>
          <span className="stat-lbl">Total Users</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{stats.enrollments || 0}</span>
          <span className="stat-lbl">Enrollments</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{stats.courses || 0}</span>
          <span className="stat-lbl">Courses</span>
        </div>
      </div>

      {/* Users */}
      <div className="section">
        <div className="section-head">
          <h2>All Users</h2>
          <div className="filter-chips">
            {['all', 'learner', 'instructor', 'admin'].map(r => (
              <button key={r} className={`chip ${filter === r ? 'active' : ''}`}
                onClick={() => setFilter(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Loading users...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No users found.</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="user-cell">
                        <img
                          src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=7c3aed&color=fff&size=32`}
                          alt={u.name} className="table-avatar"
                        />
                        {u.name}
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.country || '—'}</td>
                    <td>
                      <select
                        value={u.role}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        className="role-select"
                      >
                        <option value="learner">learner</option>
                        <option value="instructor">instructor</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="btn-danger sm" onClick={() => handleDelete(u.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
