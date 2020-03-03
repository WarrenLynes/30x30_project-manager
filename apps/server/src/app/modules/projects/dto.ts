import { IsNumber, IsString } from 'class-validator';

export default class CreateProjectDto {
  @IsString()
  public name: string;
  @IsString()
  public description: string;
  @IsString()
  public userId: string;
  @IsString()
  public githubUrl: string;
  @IsString()
  public apiUrl: string;
  @IsNumber()
  public projectNumber: number;
  @IsNumber()
  public progress: number;
}
