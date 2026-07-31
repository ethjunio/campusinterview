import { Controller, Get, Param, Version } from '@nestjs/common';

import { Public } from '@/auth/decorators/public.decorator';
import { countryCodes } from '@/common/lookups/country-codes';
import { educationLevelOptions } from '@/common/lookups/education-levels';
import { experiencePositionOptions } from '@/common/lookups/experience-positions';
import { industryOptions } from '@/common/lookups/industries';
import {
  languageLevelsOptions,
  languageOptions,
} from '@/common/lookups/languages';
import {
  areasOfInterestOptions,
  desiredJobTypeOptions,
  desiredTravelActivityOptions,
  desiredWorkAreaOptions,
} from '@/common/lookups/looking-for';
import { swissPermitOptions } from '@/common/lookups/residence-permits';
import { skillLevelsOptions, skillOptions } from '@/common/lookups/skills';

@Controller()
export class ContentController {
  public constructor() {}

  @Version('1')
  @Public()
  @Get('visitor/getlandingPageData')
  public getLandingPageData() {
    return { data: {} };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getResidencePermitsDropdown')
  public getResidencePermitsDropdown() {
    return {
      data: swissPermitOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getNationalitiesDropdown')
  public getNationalitiesDropdown() {
    return {
      data: countryCodes.map((e, i) => {
        return { id: i, name: e.alpha2 };
      }),
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getUniversityDropdown')
  public getUniversityDropdown() {
    return {
      data: [
        { id: 1, name: 'ETHZ' },
        { id: 2, name: 'HSG' },
      ],
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getMajorsDropdown')
  public getMajorsDropdown(@Param('search') _search: string) {
    return {
      data: [
        { id: 1, name: 'Computer Science' },
        { id: 2, name: 'Life Science' },
      ],
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getSpecializationDropdown')
  public getSpecializationDropdown() {
    return {
      data: [
        { id: 1, name: 'Specialization A' },
        { id: 2, name: 'Specialization B' },
      ],
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getEducationlevels')
  public getEducationlevels() {
    return {
      data: educationLevelOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/profileMgmt/getExperiencePositionDropdown')
  public getExperiencePositionDropdown() {
    return {
      data: experiencePositionOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/profileMgmt/getSkillsDropdown')
  public getSkillsDropdown() {
    return {
      data: skillOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/profileMgmt/getSkillLevelsDropdown')
  public getSkillLevelsDropdown() {
    return {
      data: skillLevelsOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get([
    'student/profileMgmt/getLanguagesDropdown',
    'company/contact-languages-dropdown',
  ])
  public getLanguagesDropdown() {
    return {
      data: languageOptions.map((e, _i) => {
        return { code: e.label, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/profileMgmt/getLanguageLevelsDropdown')
  public getLanguageLevelsDropdown() {
    return {
      data: languageLevelsOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getDesiredJobTypesDropdown')
  public getDesiredJobTypesDropdown() {
    return {
      data: desiredJobTypeOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getDesiredWorkAreasDropdown')
  public getDesiredWorkAreasDropdown() {
    return {
      data: desiredWorkAreaOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getDesiredTravelActivityDropdown')
  public getDesiredTravelActivityDropdown() {
    return {
      data: desiredTravelActivityOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/onboardingMgmt/getAreasOfInterestDropdown')
  public getAreasOfInterestDropdown(@Param('search') _search: string) {
    return {
      data: areasOfInterestOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }

  @Version('1')
  @Get('student/companyMgmt/getIndustriesDropdown')
  public getIndustriesDropdown() {
    return {
      data: industryOptions.map((e, i) => {
        return { id: i, name: e.label };
      }),
    };
  }
}
