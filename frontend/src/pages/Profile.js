import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const GOAL_LABELS = {
  complete_degree: 'Complete my degree or course',
  learn_new_skill: 'Learn a new skill',
  get_job: 'Get a job or change careers',
  start_business: 'Start or grow a business',
  personal_growth: 'Personal growth and confidence',
};
const CHALLENGE_LABELS = {
  family_responsibilities: 'Family responsibilities',
  financial_issues: 'Financial difficulties',
  pregnancy_motherhood: 'Pregnancy or motherhood',
  mental_health: 'Mental health challenges',
  early_marriage: 'Early marriage',
  lack_of_support: 'Lack of support',
  other: 'Other',
};

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    country: user?.country || '',
    phone: user?.phone || '',
    learning_goal: user?.learning_goal || '',
    challenges: user?.challenges || '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/users/profile', form);
      await refreshUser();
      toast.success('Profile updated!');
      setEditing(false);
    } catch {
      toast.error('Could not save. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="profile-card">
        <div className="profile-top">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7c3aed&color=fff&size=80`}
            alt="avatar" className="profile-avatar"
          />
          <div className="profile-top-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className="role-badge">{user?.role}</span>
          </div>
          {!editing && (
            <button className="btn-outline" onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>

        {!editing ? (
          <div className="profile-info">
            {[
              ['Bio', user?.bio],
              ['Country', user?.country],
              ['Phone', user?.phone],
              ['Learning Goal', GOAL_LABELS[user?.learning_goal]],
              ['Challenge', CHALLENGE_LABELS[user?.challenges]],
            ].map(([label, value]) => (
              <div className="info-row" key={label}>
                <span className="info-label">{label}</span>
                <span>{value || 'Not set'}</span>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} className="form">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Country</label>
                <input name="country" value={form.country} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Learning Goal</label>
              <select name="learning_goal" value={form.learning_goal} onChange={handleChange}>
                <option value="">Select</option>
                <option value="complete_degree">Complete my degree or course</option>
                <option value="learn_new_skill">Learn a new skill</option>
                <option value="get_job">Get a job or change careers</option>
                <option value="start_business">Start or grow a business</option>
                <option value="personal_growth">Personal growth and confidence</option>
              </select>
            </div>
            <div className="form-group">
              <label>Main Challenge</label>
              <select name="challenges" value={form.challenges} onChange={handleChange}>
                <option value="">Select</option>
                <option value="family_responsibilities">Family responsibilities</option>
                <option value="financial_issues">Financial difficulties</option>
                <option value="pregnancy_motherhood">Pregnancy or motherhood</option>
                <option value="mental_health">Mental health challenges</option>
                <option value="early_marriage">Early marriage</option>
                <option value="lack_of_support">Lack of support</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" className="btn-outline" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
