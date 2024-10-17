import { Deal } from "./deal.interface";

export interface DealCardProps {
  deal: Deal;
  onEnroll: (dealId: string, comment: string) => void;
  comment: string;
  onCommentChange: (dealId: string, value: string) => void;
  errorMessage?: string | null;
}
