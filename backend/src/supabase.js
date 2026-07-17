const { createClient } = require('@supabase/supabase-js');

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) in backend .env');
}

if (!supabaseKey) {
  throw new Error(
    'Missing Supabase key. Set SUPABASE_SERVICE_KEY (preferred) or SUPABASE_ANON_KEY in backend .env'
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

const createUserScopedClient = (token) =>
  createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

supabase.createUserScopedClient = createUserScopedClient;

module.exports = supabase;
