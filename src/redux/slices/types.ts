
// Authentication
export interface AuthState {
  auth: boolean;
}

// Conversations
export interface Conversation {
  URLs: string[];
  created_at: string;
  email: string;
  id: number;
  intent: string;
  notes: string;
  role: string;
}

export interface ConvosState {
  convos: Conversation[];
  loading: boolean;
  error: string | null;
}

// UserID
export interface UserIDState {
  user_id: number;
}

// Names
export interface NameState {
  firstName: string;
  lastName: string;
}