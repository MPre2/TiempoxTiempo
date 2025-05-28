export interface Review {
  id: string;
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
} 