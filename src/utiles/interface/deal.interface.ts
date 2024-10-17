import { Timestamp } from "@firebase/firestore";

export interface Deal {
  id: string;
  description: string;
  merchantEnrollmentDetails: string;
  status: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
