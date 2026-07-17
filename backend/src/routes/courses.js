const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const { protect, requireInstructor } = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*, profiles(name, avatar)')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ message: 'Error fetching courses' });
  res.json({ courses: data });
});

// Create course (instructor only)
router.post('/', protect, requireInstructor, async (req, res) => {
  const { title, description, topic, playlist_url } = req.body;
  const { data, error } = await req.supabase
    .from('courses')
    .insert({ instructor_id: req.user.id, title, description, topic, playlist_url })
    .select()
    .single();
  if (error) return res.status(500).json({ message: 'Error creating course' });
  res.json({ course: data });
});

// Get my courses (instructor)
router.get('/mine', protect, requireInstructor, async (req, res) => {
  const { data, error } = await req.supabase
    .from('courses')
    .select('*')
    .eq('instructor_id', req.user.id);
  if (error) return res.status(500).json({ message: 'Error' });
  res.json({ courses: data });
});

module.exports = router;
