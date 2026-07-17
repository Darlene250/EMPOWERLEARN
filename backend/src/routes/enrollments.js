const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const { protect } = require('../middleware/auth');

// Get all my enrollments
router.get('/', protect, async (req, res) => {
  const { data, error } = await req.supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', req.user.id)
    .order('enrolled_at', { ascending: false });
  if (error) return res.status(500).json({ message: 'Error fetching enrollments' });
  res.json({ enrollments: data });
});

// Enroll in a course
router.post('/', protect, async (req, res) => {
  const { course_id, course_title, course_thumbnail, course_source } = req.body;

  // Check already enrolled
  const { data: existing } = await req.supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', req.user.id)
    .eq('course_id', course_id)
    .single();

  if (existing) return res.status(409).json({ message: 'Already enrolled' });

  const { data, error } = await req.supabase
    .from('enrollments')
    .insert({ user_id: req.user.id, course_id, course_title, course_thumbnail, course_source: course_source || 'youtube' })
    .select()
    .single();
  if (error) return res.status(500).json({ message: 'Error enrolling' });
  res.json({ enrollment: data });
});

// Unenroll
router.delete('/:id', protect, async (req, res) => {
  const { error } = await req.supabase
    .from('enrollments')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id);
  if (error) return res.status(500).json({ message: 'Error unenrolling' });
  res.json({ message: 'Unenrolled successfully' });
});

// Update progress
router.patch('/:id/progress', protect, async (req, res) => {
  const { progress_percent, completed_lessons } = req.body;
  const { data, error } = await req.supabase
    .from('enrollments')
    .update({ progress_percent, completed_lessons, last_accessed_at: new Date() })
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .select()
    .single();
  if (error) return res.status(500).json({ message: 'Error updating progress' });
  res.json({ enrollment: data });
});

// Get single enrollment
router.get('/:courseId', protect, async (req, res) => {
  const { data, error } = await req.supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', req.user.id)
    .eq('course_id', req.params.courseId)
    .single();
  if (error) return res.status(404).json({ message: 'Not found' });
  res.json({ enrollment: data });
});

module.exports = router;
