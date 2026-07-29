import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { getCountryCodeByIndex, getIndexByAlpha2 } from '@/common/lookups/country-codes';
import { getExperienceByIndex } from '@/common/lookups/experience-positions';
import { getIndexByPermitValue, getPermitByIndex } from '@/common/lookups/residence-permits';
import { skillLevelsOptions, skillOptions } from '@/common/lookups/skills';
import { UsersService } from '@/users/users.service';
import { EducationDetailsDto } from './dtos/education.dto';
import { ExperiencePositionDto } from './dtos/experience.dto';
import { ExtracurricularPositionDto } from './dtos/extracurricular.dto';
import { JobRequirementsDto } from './dtos/job.dto';
import { LanguagePositionDto } from './dtos/language.dto';
import { PersonalDataDto } from './dtos/personal.dto';
import { SkillPositionDto } from './dtos/skill.dto';
import { Candidate } from './schemas/candidate.schema';

@Injectable()
export class CandidatesService {
  public constructor(
    @InjectModel(Candidate.name) private candidateModel: Model<Candidate>,
    private usersService: UsersService,
  ) { }

  public async getPersonalData(email: string): Promise<PersonalDataDto | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.personal) return null;

    const personal = plainToInstance(
      PersonalDataDto,
      candidate.personal,
      { excludeExtraneousValues: true }
    );

    personal.countryCode = candidate.personal?.phoneCountryCode;
    personal.nationalityId = getIndexByAlpha2(candidate.personal?.nationality)!;
    personal.residencePermitId = getIndexByPermitValue(candidate.personal?.residencePermit)!;
    personal.email = email;

    return personal;
  }

  public async setPersonalData(email: string, personal: PersonalDataDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.personal) candidate.personal = {};

    candidate.personal.salutation = personal.salutation;
    candidate.personal.firstName = personal.firstName;
    candidate.personal.lastName = personal.lastName;
    candidate.personal.phoneCountryCode = personal.countryCode;
    candidate.personal.phoneNumber = personal.phoneNumber;
    candidate.personal.dateOfBirth = personal.dateOfBirth;
    candidate.personal.city = personal.city;
    candidate.personal.country = personal.country;
    candidate.personal.nationality = getCountryCodeByIndex(personal.nationalityId)?.alpha2;
    candidate.personal.residencePermit = getPermitByIndex(personal.residencePermitId)?.value;
    candidate.personal.experienceYears = personal.experienceYears;

    await candidate.save();
  }

  public async getEducation(email: string): Promise<EducationDetailsDto | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.education) return null;

    const education = plainToInstance(
      EducationDetailsDto,
      candidate.education,
      { excludeExtraneousValues: true }
    );

    return education;
  }

  public async setEducation(email: string, education: EducationDetailsDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.education) candidate.education = {};

    candidate.education.averageGrade = education.averageGrade;
    candidate.education.educationLevelId = education.educationLevelId;
    candidate.education.endDate = education.endDate;
    candidate.education.fieldOfStudyId = education.fieldOfStudyId;
    candidate.education.otherMajor = education.otherMajor;
    candidate.education.otherSpecialization = education.otherSpecialization;
    candidate.education.otherUniversity = education.otherUniversity;
    candidate.education.specializationId = education.specializationId;
    candidate.education.startDate = education.startDate;
    candidate.education.universityId = education.universityId;

    await candidate.save();
  }

  public async getExperiences(email: string): Promise<ExperiencePositionDto[]> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id }, { experiences: 1 });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.experiences) candidate.experiences = [];

    return candidate.experiences.map(p => {
      const dto = plainToInstance(ExperiencePositionDto, p, { excludeExtraneousValues: true })
      const level = getExperienceByIndex(p.jobTypeId);
      dto.jobType = { id: p.jobTypeId, name: level?.label ?? "" };
      return dto;
    })
  }

  public async addExperience(email: string, position: ExperiencePositionDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.experiences) candidate.experiences = [];

    candidate.experiences.push({ ...position })
    await candidate.save();
  }

  public async getExtracurriculars(email: string): Promise<ExtracurricularPositionDto[]> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id }, { extracurriculars: 1 });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.extracurriculars) candidate.extracurriculars = [];

    return candidate.extracurriculars.map(p => plainToInstance(ExtracurricularPositionDto, p, { excludeExtraneousValues: true }));
  }

  public async setExtracurriculars(email: string, positions: ExtracurricularPositionDto[]) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });

    candidate.extracurriculars = [];
    for (const position of positions) candidate.extracurriculars.push({ ...position })
    await candidate.save();
  }

  public async getSkills(email: string): Promise<SkillPositionDto[]> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id }, { skills: 1 });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.skills) candidate.skills = [];

    return candidate.skills.map(p => {
      const dto = plainToInstance(SkillPositionDto, p, { excludeExtraneousValues: true })
      dto.itSkill = { id: p.itSkillId, name: skillOptions[p.itSkillId]?.label }
      dto.skillLevel = { id: p.skillLevelId, name: skillLevelsOptions[p.skillLevelId]?.label }
      return dto;
    });
  }

  public async setSkills(email: string, positions: SkillPositionDto[]) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });

    candidate.skills = [];
    for (const position of positions) candidate.skills.push({ ...position })
    await candidate.save();
  }

  public async getLanguages(email: string): Promise<LanguagePositionDto[]> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id }, { languages: 1 });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    if (!candidate.languages) candidate.languages = [];

    return candidate.languages.map(p => {
      const dto = plainToInstance(LanguagePositionDto, p, { excludeExtraneousValues: true })
      dto.language = { code: p.languageCode, name: p.languageCode }
      dto.languageLevel = { id: p.languageLevelId, name: skillLevelsOptions[p.languageLevelId]?.label }
      return dto;
    });
  }

  public async setLanguages(email: string, positions: LanguagePositionDto[]) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });

    candidate.languages = [];
    for (const position of positions) candidate.languages.push({ ...position })
    await candidate.save();
  }

  public async setJobRequirements(email: string, requirements: JobRequirementsDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException();

    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });

    await candidate.save();
  }
}
