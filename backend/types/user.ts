export interface User {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  subscription_tier: "free" | "pro";
  created_at: string;
}