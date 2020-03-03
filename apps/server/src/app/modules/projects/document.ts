import { Document } from 'mongoose';

export interface ProjectDocument extends Document {
  readonly name: string;
  readonly description: string;
  readonly userId: string;
  readonly githubUrl: string;
  readonly apiUrl: string;
  readonly projectNumber: number;
  readonly progress: number;
}
