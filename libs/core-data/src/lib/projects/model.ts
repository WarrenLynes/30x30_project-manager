export interface Project {
  _id: any,
  id: any,
  name: string,
  description: string,
  userId: string,
  githubUrl: string,
  apiUrl: string,
  projectNumber: number,
  progress: number,
}

export const emptyProject:Project = {
  _id: null,
  id: null,
  name: null,
  description: null,
  userId: null,
  githubUrl: null,
  apiUrl: null,
  projectNumber: null,
  progress: 0
};
