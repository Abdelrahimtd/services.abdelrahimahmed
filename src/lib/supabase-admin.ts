import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cnzxgsyiqiccjlucuurv.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuenhnc3lpcWljY2psdWN1dXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NDA5NTEsImV4cCI6MjEwMTIxNjk1MX0.Ys-FgFs9EJUaZeVqlsvN1FwLBWzs4G1WUXlXi4orPVs";

// Server-side client that bypasses RLS (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
