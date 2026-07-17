import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const GOAL_QUERIES = {
  complete_degree: 'university courses for women africa education',
  learn_new_skill: 'coding tutorials beginners programming',
  get_job: 'career skills CV writing interview tips women',
  start_business: 'entrepreneurship for women africa small business',
  personal_growth: 'confidence personal development women leadership',
};

const formatViews = (n) => {
  if (!n) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
};

const parseDuration = (iso) => {
  if (!iso) return '';
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = match[1] ? `${match[1]}:` : '';
  const m = match[2] ? match[2].padStart(h ? 2 : 1, '0') : '0';
  const s = (match[3] || '0').padStart(2, '0');
  return `${h}${m}:${s}`;
};

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [enrolledIds, setEnrolledIds] = useState(new Set());

  // Load enrolled course IDs
  useEffect(() => {
    api.get('/enrollments').then(res => {
      const ids = new Set((res.data.enrollments || []).map(e => e.course_id));
      setEnrolledIds(ids);
    });
  }, []);

  // Auto-search on load based on goal
  useEffect(() => {
    const defaultQuery = GOAL_QUERIES[user?.learning_goal] || 'education for women africa';
    setQuery(defaultQuery);
    search(defaultQuery);
  }, [user]);

  const search = async (q) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/youtube/search?q=${encodeURIComponent(q)}&max=12`);
      setResults(data.results || []);
    } catch {
      toast.error('Could not load courses. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) search(query.trim());
  };

  const handleEnroll = async (video) => {
    if (enrolledIds.has(video.id)) {
      return toast('You are already enrolled in this course', { icon: 'ℹ️' });
    }
    try {
      await api.post('/enrollments', {
        course_id: video.id,
        course_title: video.title,
        course_thumbnail: video.thumbnail,
        course_source: 'youtube',
      });
      setEnrolledIds(prev => new Set([...prev, video.id]));
      toast.success('Enrolled! Find it on your dashboard.');
    } catch (err) {
      if (err.response?.status === 409) {
        toast('Already enrolled', { icon: 'ℹ️' });
      } else {
        toast.error('Could not enroll. Try again.');
      }
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Browse Courses</h1>
        <p>Find free courses from YouTube on any topic you want to learn.</p>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for any topic..."
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="topic-chips">
        {Object.entries(GOAL_QUERIES).map(([key, q]) => (
          <button key={key} className="chip"
            onClick={() => { setQuery(q); search(q); }}>
            {key.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="empty-state">Searching courses...</div>
      ) : (
        <div className="course-grid">
          {results.map(video => (
            <div className="course-card" key={video.id}>
              <div className="thumb-wrap" onClick={() => navigate(`/course/${video.id}`)}>
                <img src={video.thumbnail} alt={video.title} className="course-thumb" />
                {video.duration && (
                  <span className="duration-badge">{parseDuration(video.duration)}</span>
                )}
              </div>
              <div className="course-card-body">
                <h3 onClick={() => navigate(`/course/${video.id}`)}>{video.title}</h3>
                <p className="channel-name">{video.channel}</p>
                <p className="view-count">{formatViews(parseInt(video.viewCount))} views</p>
                <button
                  className={enrolledIds.has(video.id) ? 'btn-enrolled' : 'btn-primary sm'}
                  onClick={() => handleEnroll(video)}
                  disabled={enrolledIds.has(video.id)}
                >
                  {enrolledIds.has(video.id) ? '✓ Enrolled' : 'Enroll'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
