import * as express from 'express';
import Controller from '../../interfaces/controller.interface';
import authMiddleware from '../../middleware/auth.middleware';
import CreateProjectDto from './dto';
import projectModel from './model';

export default class ProjectController implements Controller {
  public path = '/projects';
  public router = express.Router();
  private project = projectModel;

  constructor() {
    this.router.get(`${this.path}`, authMiddleware(), this.fetchAll);
    this.router.post(`${this.path}`, authMiddleware(), this.create);
    this.router.put(`${this.path}/:id`, authMiddleware(), this.edit);
    this.router.delete(`${this.path}/:id`, authMiddleware(), this.delete);
  }

  private fetchAll = async (req: any, res: express.Response, next: express.NextFunction) => {
    const projects = await this.project.find({userId: req.user._id});
    res.send(projects);
  };

  private create = async (req: any, res: express.Response, next: express.NextFunction) => {
    const count = await this.project.countDocuments({userId: req.user._id});
    const projectData: CreateProjectDto = {userId: req.user._id, projectNumber: count + 1, ...req.body.project};
    const newProject = new this.project(projectData);
    const project = await newProject.save();
    res.send(project);
  };

  private delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await this.project.findOneAndDelete({_id: req.params.id});
    res.send(result);
  };

  private edit = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const projectId = req.params.id;
    const projectData: CreateProjectDto = req.body;
    await this.project.findOneAndUpdate({ _id: projectId }, projectData);
    const updatedProject = await this.project.findById(projectId);
    res.send(updatedProject);
  }
}
