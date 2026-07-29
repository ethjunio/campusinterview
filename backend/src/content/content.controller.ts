import { Controller, Get, Param, Version } from '@nestjs/common';

import { Public } from '@/auth/decorators/public.decorator';
import { countryCodes } from '@/common/lookups/country-codes';
import { educationLevelOptions } from '@/common/lookups/education-levels';
import { experiencePositionOptions } from '@/common/lookups/experience-positions';
import { languageLevelsOptions, languageOptions } from '@/common/lookups/languages';
import { areasOfInterestOptions, desiredJobTypeOptions, desiredTravelActivityOptions, desiredWorkAreaOptions } from '@/common/lookups/looking-for';
import { swissPermitOptions } from '@/common/lookups/residence-permits';
import { skillLevelsOptions, skillOptions } from '@/common/lookups/skills';

@Controller()
export class ContentController {
  public constructor() { }

  @Version('1')
  @Public()
  @Get('visitor/getlandingPageData')
  public async getLandingPageData() {
    return { data: {} }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getResidencePermitsDropdown')
  public async getResidencePermitsDropdown() {
    return { data: swissPermitOptions.map((e, i) => { return { id: i, name: e.label } }) }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getNationalitiesDropdown')
  public async getNationalitiesDropdown() {
    return { data: countryCodes.map((e, i) => { return { id: i, name: e.alpha2 } }) }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getUniversityDropdown')
  public async getUniversityDropdown() {
    return {
      data: [
        { id: 1, name: "ETHZ" },
        { id: 2, name: "HSG" }
      ]
    }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getMajorsDropdown')
  public async getMajorsDropdown(@Param('search') search: string) {
    return {
      data: [
        { id: 1, name: "Computer Science" },
        { id: 2, name: "Life Science" }
      ]
    }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getSpecializationDropdown')
  public async getSpecializationDropdown() {
    return {
      data: [
        { id: 1, name: "Specialization A" },
        { id: 2, name: "Specialization B" }
      ]
    }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getEducationlevels')
  public async getEducationlevels() {
    return {
      data: educationLevelOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/profileMgmt/getExperiencePositionDropdown')
  public async getExperiencePositionDropdown() {
    return {
      data: experiencePositionOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/profileMgmt/getSkillsDropdown')
  public async getSkillsDropdown() {
    return {
      data: skillOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/profileMgmt/getSkillLevelsDropdown')
  public async getSkillLevelsDropdown() {
    return {
      data: skillLevelsOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/profileMgmt/getLanguagesDropdown')
  public async getLanguagesDropdown() {
    return {
      data: languageOptions.map(
        (e, i) => { return { code: e.label, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/profileMgmt/getLanguageLevelsDropdown')
  public async getLanguageLevelsDropdown() {
    return {
      data: languageLevelsOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  // TODO

  @Version('1')
  @Get('student/onboardingMgmt/getDesiredJobTypesDropdown')
  public async getDesiredJobTypesDropdown() {
    return {
      data: desiredJobTypeOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getDesiredWorkAreasDropdown')
  public async getDesiredWorkAreasDropdown() {
    return {
      data: desiredWorkAreaOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getDesiredTravelActivityDropdown')
  public async getDesiredTravelActivityDropdown() {
    return {
      data: desiredTravelActivityOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }

  @Version('1')
  @Get('student/onboardingMgmt/getAreasOfInterestDropdown')
  public async getAreasOfInterestDropdown(@Param('search') search: string) {
    return {
      data: areasOfInterestOptions.map(
        (e, i) => { return { id: i, name: e.label } }
      )
    }
  }
}
