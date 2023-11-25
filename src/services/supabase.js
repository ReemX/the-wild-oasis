import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ctuzggtnfhkcrixendab.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dXpnZ3RuZmhrY3JpeGVuZGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NzUwMTgsImV4cCI6MjAxNTU1MTAxOH0.bSCfPaU4tOapzwzovndbVe1l4QCBEu89pskJKjg-l-g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
