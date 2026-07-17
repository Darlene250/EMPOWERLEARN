import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CompleteProfile = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: '',
    country: '',
    phone: '',
    learning_goal: '',
    challenges: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.learning_goal) return toast.error('Please select a learning goal');
    setLoading(true);
    try {
      await api.put('/users/profile', form);
      await refreshUser();
      toast.success('Profile saved! Welcome 🎉');
      navigate('/dashboard');
    } catch {
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-page">
      <div className="setup-card">
        <div className="setup-header">
          {user?.avatar && <img src={user.avatar} alt="avatar" className="setup-avatar" />}
          <h2>Hi {user?.name?.split(' ')[0]} 👋</h2>
          <p>Tell us a bit about yourself so we can personalise your learning experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Tell us about yourself</label>
            <textarea name="bio" rows={3}
              placeholder="e.g. I'm a mother who paused school and wants to continue..."
              value={form.bio} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <input name="country" placeholder="e.g. Rwanda" value={form.country} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone (optional)</label>
              <input name="phone" placeholder="+250..." value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>What is your main learning goal? *</label>
            <select name="learning_goal" value={form.learning_goal} onChange={handleChange} required>
              <option value="">Select a goal</option>
              <option value="complete_degree">Complete my degree or course</option>
              <option value="learn_new_skill">Learn a new skill</option>
              <option value="get_job">Get a job or change careers</option>
              <option value="start_business">Start or grow a business</option>
              <option value="personal_growth">Personal growth and confidence</option>
            </select>
          </div>

          <div className="form-group">
            <label>What challenge have you faced in your learning journey?</label>
            <select name="challenges" value={form.challenges} onChange={handleChange}>
              <option value="">Select one</option>
              <option value="family_responsibilities">Family responsibilities</option>
              <option value="financial_issues">Financial difficulties</option>
              <option value="pregnancy_motherhood">Pregnancy or motherhood</option>
              <option value="mental_health">Mental health challenges</option>
              <option value="early_marriage">Early marriage</option>
              <option value="lack_of_support">Lack of support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save & Go to Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
