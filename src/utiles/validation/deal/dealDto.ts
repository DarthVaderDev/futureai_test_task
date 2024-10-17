import { DealStatus } from "./deal.enum";

export interface DealDTO {
    dealId: string;
    merchantId: string;
    description: string;
    merchantEnrollmentDetails: string;
    createdAt: Date;
    updatedAt: Date;
    status: DealStatus
  }
  