import * as mongoose from 'mongoose';
import Project from './interface';

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  projectNumber: {
    type: Number,
    unique: true,
    required: true
  },
  userId:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  githubUrl: String,
  apiUrl: String,
  progress: Number
});

const projectModel = mongoose.model<Project & mongoose.Document>('Project', projectSchema);

export default projectModel;
