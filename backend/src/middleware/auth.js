const supabase = require('../supabase');
const fs = require('fs');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      fs.appendFileSync('debug.log', 'No token provided\n');
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      fs.appendFileSync('debug.log', `getUser error: ${JSON.stringify(error)}\n`);
      return res.status(401).json({ message: 'Invalid token' });
    }

const { createClient } = require('@supabase/supabase-js');

    // Create a Supabase client scoped to this user's token so RLS works properly
    const userSupabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

    // Get profile from profiles table
    const { data: profile, error: profileError } = await userSupabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (profileError) {
      fs.appendFileSync('debug.log', `profileError: ${JSON.stringify(profileError)}\n`);
    }

    req.user = profile || { id: user.id, email: user.email };
    req.token = token; // Save token for routes to use
    req.supabase = userSupabase; // Expose scoped client
    next();
  } catch (err) {
    fs.appendFileSync('debug.log', `Auth catch error: ${err.message}\n`);
    res.status(401).json({ message: 'Auth error' });
  }
};

const requireInstructor = async (req, res, next) => {
  if (!['instructor', 'admin'].includes(req.user?.role)) {
    return res.status(403).json({ message: 'Instructor access required' });
  }
  next();
};

const requireAdmin = async (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { protect, requireInstructor, requireAdmin };
