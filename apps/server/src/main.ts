import ProjectController from './app/modules/projects/controller';

require('dotenv').config();
import App from './app';
import AuthenticationController from './app/modules/auth/controller';
import UserController from './app/modules/user/controller';

const app = new App([
  new AuthenticationController(),
  new UserController(),
  new ProjectController()
]);

app.listen();
