import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CandidatesService } from './candidates.service';
import { EducationDetailsDto } from './dtos/education.dto';
import { ExperiencePositionDto } from './dtos/experience.dto';
import { ExtracurricularPositionDto } from './dtos/extracurricular.dto';
import { JobRequirementsDto } from './dtos/job.dto';
import { LanguagePositionDto } from './dtos/language.dto';
import { PersonalDataDto } from './dtos/personal.dto';
import { SkillPositionDto } from './dtos/skill.dto';

@Controller()
export class CandidatesController {
  public constructor(private candidatesService: CandidatesService) {}

  @Version('1')
  @Get('student/onboardingMgmt/getPersonalDetails')
  public async getPersonalData(@Req() req: any) {
    const email = req.user.email;
    const personal = await this.candidatesService.getPersonalData(email);
    return { status: true, message: 'OK', data: personal };
  }

  @Version('1')
  @Put('student/onboardingMgmt/savePersonalDetails')
  @UseInterceptors(FileInterceptor('image'))
  public async setPersonalData(
    @Req() req: any,
    @Body() personal: PersonalDataDto,
    @UploadedFile() _image: Express.Multer.File,
  ) {
    const email = req.user.email;
    await this.candidatesService.setPersonalData(email, personal);
  }

  @Version('1')
  @Get('student/onboardingMgmt/getCandidateEducationDetails')
  public async getEducation(@Req() req: any) {
    const email = req.user.email;
    const personal = await this.candidatesService.getEducation(email);
    return { status: true, message: 'OK', data: personal };
  }

  @Version('1')
  @Post('student/onboardingMgmt/saveEducationDetails')
  public async setEducation(
    @Req() req: any,
    @Body() education: EducationDetailsDto,
  ) {
    const email = req.user.email;
    await this.candidatesService.setEducation(email, education);
  }

  @Version('1')
  @Get('student/profileMgmt/getCandidateExperienceDetails')
  public async getExperiences(@Req() req: any) {
    const email = req.user.email;
    const positions = await this.candidatesService.getExperiences(email);
    return { status: true, message: 'OK', data: positions };
  }

  @Version('1')
  @Post('student/profileMgmt/addCandidateExperience')
  public async addExperience(
    @Req() req: any,
    @Body() position: ExperiencePositionDto,
  ) {
    const email = req.user.email;
    await this.candidatesService.addExperience(email, position);
  }

  @Version('1')
  @Get('student/profileMgmt/getCandidateExtracuriculars/extracurricular')
  public async getExtracuriculars(@Req() req: any) {
    const email = req.user.email;
    const extracurriculars =
      await this.candidatesService.getExtracurriculars(email);
    return { status: true, message: 'OK', data: extracurriculars };
  }

  @Version('1')
  @Post('student/profileMgmt/saveCandidateExtracuricular/extracurricular')
  public async setExtracuriculars(
    @Req() req: any,
    @Body() extracurriculars: ExtracurricularPositionDto[],
  ) {
    const email = req.user.email;
    await this.candidatesService.setExtracurriculars(email, extracurriculars);
  }

  @Version('1')
  @Get('/student/profileMgmt/getCandidateSkills/skill')
  public async getSkills(@Req() req: any) {
    const email = req.user.email;
    const skills = await this.candidatesService.getSkills(email);
    return { status: true, message: 'OK', data: skills };
  }

  @Version('1')
  @Post('student/profileMgmt/saveCandidateSkill/skill')
  public async setSkills(@Req() req: any, @Body() skills: SkillPositionDto[]) {
    const email = req.user.email;
    await this.candidatesService.setSkills(email, skills);
  }

  @Version('1')
  @Get('student/profileMgmt/getCandidateLanguages/language')
  public async getLanguages(@Req() req: any) {
    const email = req.user.email;
    const languages = await this.candidatesService.getLanguages(email);
    return { status: true, message: 'OK', data: languages };
  }

  @Version('1')
  @Post('student/profileMgmt/saveCandidateLanguage/language')
  public async setLanguages(
    @Req() req: any,
    @Body() languages: LanguagePositionDto[],
  ) {
    const email = req.user.email;
    await this.candidatesService.setLanguages(email, languages);
  }

  @Version('1')
  @Get('student/onboardingMgmt/getCandidateJobRequirements')
  public getJobRequirements(@Req() req: any) {
    const _email = req.user.email;
    // TODO
    return { status: true, message: 'OK', data: null };
  }

  @Version('1')
  @Post('student/onboardingMgmt/saveJobRequirementDetails')
  public async setJobRequirements(
    @Req() req: any,
    @Body() requirements: JobRequirementsDto,
  ) {
    const email = req.user.email;
    await this.candidatesService.setJobRequirements(email, requirements);
  }
}
