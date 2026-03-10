export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  confidence: number;
  added_via: "manual" | "scan";
  user_id: string;
  created_at: string;
}