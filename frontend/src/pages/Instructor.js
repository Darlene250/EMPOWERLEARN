import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Instructor = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', topic: '', playlist_url: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.get('/courses/mine')
      .then(res => setCourses(res.data.courses || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.playlist_url) return toast.error('Title and YouTube URL are required');
    setSubmitting(true);
    try {
      const { data } = await api.post('/courses', form);
      setCourses(prev => [data.course, ...prev]);
      setForm({ title: '', description: '', topic: '', playlist_url: '' });
      setShowForm(false);
      toast.success('Course created!');
    } catch {
      toast.error('Could not create course');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Instructor Panel</h1>
        <button className="btn-primary sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Course'}
        </button>
      </div>

      {showForm && (
        <div className="card mb">
          <h3>Create a New Course</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Course Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Introduction to Python" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="What will learners gain from this course?" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Topic</label>
                <input name="topic" value={form.topic} onChange={handleChange} placeholder="e.g. Technology" />
              </div>
              <div className="form-group">
                <label>YouTube Playlist URL *</label>
                <input name="playlist_url" value={form.playlist_url} onChange={handleChange} placeholder="https://youtube.com/playlist?list=..." required />
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Course'}
            </button>
          </form>
        </div>
      )}

      <div className="section">
        <h2>My Courses</h2>
        {loading ? (
          <div className="empty-state">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any courses yet.</p>
            <button className="btn-primary mt" onClick={() => setShowForm(true)}>Create Your First Course</button>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Created</th>
                  <th>Playlist</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id}>
                    <td><strong>{c.title}</strong><br /><small>{c.description?.slice(0, 60)}...</small></td>
                    <td>{c.topic || '—'}</td>
                    <td>{new Date(c.created_at).toLocaleDateString()}</td>
                    <td><a href={c.playlist_url} target="_blank" rel="noreferrer" className="link">View Playlist</a></td>
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

export default Instructor;
