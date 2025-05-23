import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mmmfkevwtvpdzqqghbng.supabase.co';
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_API_KEY);

export default supabase;
