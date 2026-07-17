const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const { protect } = require('../middleware/auth');

// Helper to create a user-scoped client
const getUserClient = (token) => supabase.createUserScopedClient(token);

// Get my profile
router.get('/profile', protect, async (req, res) => {
  const userSupabase = getUserClient(req.token);
  const { data, error } = await userSupabase
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    require('fs').appendFileSync('debug.log', `get /profile error: ${JSON.stringify(error)}\n`);
    return res.status(500).json({ message: 'Error fetching profile' });
  }
  
  res.json({ user: data || req.user });
});

// Update my profile
router.put('/profile', protect, async (req, res) => {
  const { name, bio, country, phone, learning_goal, challenges } = req.body;
  const userSupabase = getUserClient(req.token);
  
  const { data, error } = await userSupabase
    .from('profiles')
    .upsert({ 
      id: req.user.id,
      email: req.user.email,
      name, 
      bio, 
      country, 
      phone, 
      learning_goal, 
      challenges, 
      profile_completed: true,
      role: req.user.role || 'student'
    })
    .select()
    .single();
    
  if (error) {
    require('fs').appendFileSync('debug.log', `put /profile error: ${JSON.stringify(error)}\n`);
    return res.status(500).json({ message: 'Error updating profile' });
  }
  
  res.json({ user: data });
});

module.exports = router;
