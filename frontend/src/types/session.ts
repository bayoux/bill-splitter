export interface Session {
  id: string;
  name: string;
  createdAt: string;
  expiresAt: string | null;
  participantCount: number;
}
