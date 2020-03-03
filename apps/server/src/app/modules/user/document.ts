import { Document } from 'mongoose';

export interface UserDocument extends Document {
  readonly name: string;
  readonly email?: string;
  readonly password?: string;
  readonly phone?: string;
  readonly projectId: string;
}
