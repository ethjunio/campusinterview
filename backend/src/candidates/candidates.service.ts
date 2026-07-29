import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { getCountryCodeByIndex, getIndexByAlpha2 } from '@/common/lookups/country-codes';
import { getExperienceByIndex } from '@/common/lookups/experience-positions';
import { getIndexByPermitValue, getPermitByIndex } from '@/common/lookups/residence-permits';
import { skillLevelsOptions, skillOptions } from '@/common/lookups/skills';
import { UserType } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { EducationDetailsDto } from './dtos/education.dto';
import { ExperiencePositionDto } from './dtos/experience.dto';
import { ExtracurricularPositionDto } from './dtos/extracurricular.dto';
import { JobRequirementsDto } from './dtos/job.dto';
import { LanguagePositionDto } from './dtos/language.dto';
import { PersonalDataDto } from './dtos/personal.dto';
import { SkillPositionDto } from './dtos/skill.dto';
import { Candidate, CandidateDocument } from './schemas/candidate.schema';

@Injectable()
export class CandidatesService {
  public constructor(
    @InjectModel(Candidate.name) private candidateModel: Model<Candidate>,
    private usersService: UsersService,
  ) { }

  private async getCandidate(email: string): Promise<CandidateDocument> {
    const user = await this.usersService.findByEmail(email);
    if (user.type !== UserType.Candidate) throw new BadRequestException();
    let candidate = await this.candidateModel.findOne({ userId: user._id });
    if (!candidate) candidate = await this.candidateModel.create({ userId: user._id });
    return candidate;
  }

  public async getPersonalData(email: string): Promise<PersonalDataDto | null> {
    const candidate = await this.getCandidate(email);
    if (!candidate.personal) return null;

    const personal = plainToInstance(
      PersonalDataDto,
      candidate.personal,
      { excludeExtraneousValues: true }
    );

    personal.countryCode = candidate.personal?.phoneCountryCode;
    personal.nationalityId = getIndexByAlpha2(candidate.personal?.nationality)!;
    personal.residencePermitId = getIndexByPermitValue(candidate.personal?.residencePermit)!;

    return personal;
  }

  public async setPersonalData(email: string, personal: PersonalDataDto) {
    const candidate = await this.getCandidate(email);
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
    await this.updateOnboardingState(email)
  }

  public async getEducation(email: string): Promise<EducationDetailsDto | null> {
    const candidate = await this.getCandidate(email);;
    if (!candidate.education) return null;
    return plainToInstance(
      EducationDetailsDto,
      candidate.education,
      { excludeExtraneousValues: true }
    );
  }

  public async setEducation(email: string, education: EducationDetailsDto) {
    const candidate = await this.getCandidate(email);
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
    await this.updateOnboardingState(email)
  }

  public async getExperiences(email: string): Promise<ExperiencePositionDto[]> {
    const candidate = await this.getCandidate(email);
    if (!candidate.experiences) candidate.experiences = [];
    return candidate.experiences.map(p => {
      const dto = plainToInstance(
        ExperiencePositionDto,
        p,
        { excludeExtraneousValues: true }
      )
      const level = getExperienceByIndex(p.jobTypeId);
      dto.jobType = { id: p.jobTypeId, name: level?.label ?? "" };
      return dto;
    });
  }

  public async addExperience(email: string, position: ExperiencePositionDto) {
    const candidate = await this.getCandidate(email);
    if (!candidate.experiences) candidate.experiences = [];
    candidate.experiences.push({ ...position })
    await candidate.save();
    await this.updateOnboardingState(email)
  }

  public async getExtracurriculars(email: string): Promise<ExtracurricularPositionDto[]> {
    const candidate = await this.getCandidate(email);
    if (!candidate.extracurriculars) candidate.extracurriculars = [];
    return candidate.extracurriculars.map(p => {
      const dto = plainToInstance(
        ExtracurricularPositionDto,
        p,
        { excludeExtraneousValues: true }
      )
      return dto;
    });
  }

  public async setExtracurriculars(email: string, positions: ExtracurricularPositionDto[]) {
    const candidate = await this.getCandidate(email);
    candidate.extracurriculars = [];
    for (const position of positions) candidate.extracurriculars.push({ ...position })
    await candidate.save();
    await this.updateOnboardingState(email)
  }

  public async getSkills(email: string): Promise<SkillPositionDto[]> {
    const candidate = await this.getCandidate(email);
    if (!candidate.skills) candidate.skills = [];
    return candidate.skills.map(p => {
      const dto = plainToInstance(SkillPositionDto, p, { excludeExtraneousValues: true })
      dto.itSkill = { id: p.itSkillId, name: skillOptions[p.itSkillId]?.label }
      dto.skillLevel = { id: p.skillLevelId, name: skillLevelsOptions[p.skillLevelId]?.label }
      return dto;
    });
  }

  public async setSkills(email: string, positions: SkillPositionDto[]) {
    const candidate = await this.getCandidate(email);
    candidate.skills = [];
    for (const position of positions) candidate.skills.push({ ...position })
    await candidate.save();
    await this.updateOnboardingState(email)
  }

  public async getLanguages(email: string): Promise<LanguagePositionDto[]> {
    const candidate = await this.getCandidate(email);
    if (!candidate.languages) candidate.languages = [];
    return candidate.languages.map(p => {
      const dto = plainToInstance(LanguagePositionDto, p, { excludeExtraneousValues: true })
      dto.language = { code: p.languageCode, name: p.languageCode }
      dto.languageLevel = { id: p.languageLevelId, name: skillLevelsOptions[p.languageLevelId]?.label }
      return dto;
    });
  }

  public async setLanguages(email: string, positions: LanguagePositionDto[]) {
    const candidate = await this.getCandidate(email);
    candidate.languages = [];
    for (const position of positions) candidate.languages.push({ ...position })
    await candidate.save();
  }

  public async setJobRequirements(email: string, requirements: JobRequirementsDto) {
    const candidate = await this.getCandidate(email);

    await candidate.save();
    await this.updateOnboardingState(email)
  }

  public async updateOnboardingState(email: string): Promise<string> {
    const candidate = await this.getCandidate(email);
    let onboardingState = 'personal';

    if (candidate.personal && candidate.education && !candidate.languages)
      onboardingState = 'languages';
    else if (candidate.personal && candidate.education && candidate.languages)
      onboardingState = 'finished';

    candidate.onboardingState = onboardingState
    await candidate.save();
    return onboardingState;
  }
}
