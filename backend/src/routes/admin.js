const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const { protect, requireAdmin } = require('../middleware/auth');

// Get all users
router.get('/users', protect, requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ message: 'Error fetching users' });
  res.json({ users: data });
});

// Change user role
router.patch('/users/:id/role', protect, requireAdmin, async (req, res) => {
  const { role } = req.body;
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ message: 'Error updating role' });
  res.json({ user: data });
});

// Delete user
router.delete('/users/:id', protect, requireAdmin, async (req, res) => {
  const { error } = await supabase.auth.admin.deleteUser(req.params.id);
  if (error) return res.status(500).json({ message: 'Error deleting user' });
  res.json({ message: 'User deleted' });
});

// Platform stats
router.get('/stats', protect, requireAdmin, async (req, res) => {
  const [{ count: users }, { count: enrollments }, { count: courses }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('courses').select('*', { count: 'exact', head: true }),
  ]);
  res.json({ stats: { users, enrollments, courses } });
});

module.exports = router;
