import { createClient } from '@supabase/supabase-js'

export type ProjectStatus = 'IN_PROGRESS' | 'AWAITING_FEEDBACK' | 'COMPLETED' | 'ON_HOLD';

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  clientBrief: string;
  email: string;
  files: { name: string; size: string; type: 'mov' | 'pdf' | 'png' | 'zip' }[];
}


// IMPORTANT: Replace with your actual Supabase project URL and Anon Key
const supabaseUrl = 'https://jhevdkbaaqshgihsbrlr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZXZka2JhYXFzaGdpaHNicmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNjY2MTEsImV4cCI6MjA3Mzk0MjYxMX0.KgCI3xzfVSD1sm_CK32kElfPvDwA5wbk91vLtLvcOzE';

// This creates the "client" or the connection to your backend
export const supabase = createClient(supabaseUrl, supabaseAnonKey);