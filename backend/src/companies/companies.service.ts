import { StorageBucket } from '@/storage/storage.buckets';
import { StorageService } from '@/storage/storage.service';
import { UserType } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CompanyDto } from './dtos/company.dto';
import { CompanyContactDataDto, ContactPersonDto } from './dtos/contact.dto';
import { CompanyFactsFiguresDataDto } from './dtos/facts-figures.dto';
import { CompanyGeneralDataDto } from './dtos/general.dto';
import { CompanyRepresentantDto } from './dtos/representants.dto';
import { CompanyWhyJoinUsDataDto } from './dtos/why-join-us.dto';
import {
  Company,
  CompanyDocument,
  CompanyOnboardingState,
} from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  public constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    private usersService: UsersService,
    private storageService: StorageService,
  ) {}

  private async getCompanyInternal(email: string): Promise<CompanyDocument> {
    const user = await this.usersService.findByEmail(email);
    if (user.type !== UserType.Company) throw new BadRequestException();
    let company = await this.companyModel.findOne({ userId: user._id });
    if (!company)
      company = await this.companyModel.create({ userId: user._id });
    return company;
  }

  public async getCompany(email: string): Promise<CompanyDto> {
    const company = await this.getCompanyInternal(email);

    const dto = plainToInstance(CompanyDto, company, {
      excludeExtraneousValues: true,
    });

    dto.CompanyContacts = company.contacts?.map((contact) =>
      plainToInstance(ContactPersonDto, contact, {
        excludeExtraneousValues: true,
      }),
    );

    if (company.imageKey) {
      dto.imageUrl = await this.storageService.getPresignedUrl(
        StorageBucket.Companies,
        company.imageKey,
      );
    }

    return dto;
  }

  public async setGeneralData(
    email: string,
    general: CompanyGeneralDataDto,
    image?: Express.Multer.File,
  ) {
    const company = await this.getCompanyInternal(email);

    company.name = general.name;
    company.description = general.description;
    company.website = general.website;
    company.industries = general.industries;

    if (image) {
      const key = `${company._id.toString()}/logo`;
      await this.storageService.putObject(
        StorageBucket.Companies,
        key,
        image.buffer,
        image.mimetype,
      );
      company.imageKey = key;
    }

    await company.save();
  }

  public async setContactData(email: string, contacts: CompanyContactDataDto) {
    const company = await this.getCompanyInternal(email);
    company.contacts = [];

    company.contacts.push({
      type: 'main',
      salutation: contacts.main.salutation,
      firstName: contacts.main.firstName,
      lastName: contacts.main.lastName,
      email: contacts.main.email,
      phoneNumber: contacts.main.phoneNumber,
      language: contacts.main.language,
    });

    if (contacts.deputy) {
      company.contacts.push({
        type: 'deputy',
        salutation: contacts.deputy.salutation,
        firstName: contacts.deputy.firstName,
        lastName: contacts.deputy.lastName,
        email: contacts.deputy.email,
        phoneNumber: contacts.deputy.phoneNumber,
        language: contacts.deputy.language,
      });
    }

    await company.save();
  }

  public async setFactsFiguresData(
    email: string,
    factsFigures: CompanyFactsFiguresDataDto,
  ) {
    const company = await this.getCompanyInternal(email);

    company.corporateActivity = factsFigures.corporateActivity;
    company.headquarterLocation = factsFigures.headquarterLocation;
    company.philosophy = factsFigures.philosophy;
    company.shareOfGraduates = factsFigures.shareOfGraduates;
    company.swissEmployeeCount = factsFigures.swissEmployeeCount;
    company.swissOfficeLocation = factsFigures.swissOfficeLocation;
    company.worldEmployeeCount = factsFigures.worldEmployeeCount;

    await company.save();
  }

  public async setWhyJoinUsData(
    email: string,
    whyJoinUs: CompanyWhyJoinUsDataDto,
  ) {
    const company = await this.getCompanyInternal(email);

    company.culture = whyJoinUs.culture;
    company.fieldsOfStudy = whyJoinUs.fieldsOfStudy;
    company.lookingFor = whyJoinUs.lookingFor;
    company.mainLanguage = whyJoinUs.mainLanguage;
    company.offeredPositionTypes = whyJoinUs.offeredPositionTypes;
    company.startingSalary = whyJoinUs.startingSalary;
    company.weOffer = whyJoinUs.weOffer;

    await company.save();
  }

  public async createRepresentants(
    email: string,
    _representants: CompanyRepresentantDto[],
  ) {
    const company = await this.getCompanyInternal(email);

    // TODO

    company.onboardingState = CompanyOnboardingState.Finished;
    await company.save();
  }

  public async getOnboardingState(email: string): Promise<string> {
    const company = await this.getCompanyInternal(email);
    return company.onboardingState;
  }
}
