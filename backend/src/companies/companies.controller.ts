import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompaniesService } from './companies.service';
import { CompanyContactDataDto } from './dtos/contact.dto';
import { CompanyFactsFiguresDataDto } from './dtos/facts-figures.dto';
import { CompanyGeneralDataDto } from './dtos/general.dto';
import { CompanyRepresentantDto } from './dtos/representants.dto';
import { CompanyWhyJoinUsDataDto } from './dtos/why-join-us.dto';

@Controller()
export class CompaniesController {
  public constructor(private companiesService: CompaniesService) {}

  @Version('1')
  @Get('company')
  public async getCompany(@Req() req: any) {
    const email = req.user.email;
    const company = await this.companiesService.getCompany(email);
    return { status: true, message: 'OK', data: company };
  }

  @Version('1')
  @Post('company/onboarding-general-data')
  @UseInterceptors(FileInterceptor('image'))
  public async setGeneralData(
    @Req() req: any,
    @Body() general: CompanyGeneralDataDto,
    @UploadedFile() _image: Express.Multer.File,
  ) {
    const email = req.user.email;
    await this.companiesService.setGeneralData(email, general);
  }

  @Version('1')
  @Post('company/onboarding-contacts')
  public async setContactData(
    @Req() req: any,
    @Body() contacts: CompanyContactDataDto,
  ) {
    const email = req.user.email;
    await this.companiesService.setContactData(email, contacts);
  }

  @Version('1')
  @Post('company/onboarding-facts-and-figures')
  public async setFactsFiguresData(
    @Req() req: any,
    @Body() factsFigures: CompanyFactsFiguresDataDto,
  ) {
    const email = req.user.email;
    await this.companiesService.setFactsFiguresData(email, factsFigures);
  }

  @Version('1')
  @Post('company/onboarding-why-join-us')
  public async setWhyJoinUsData(
    @Req() req: any,
    @Body() whyJoinUs: CompanyWhyJoinUsDataDto,
  ) {
    const email = req.user.email;
    await this.companiesService.setWhyJoinUsData(email, whyJoinUs);
  }

  @Version('1')
  @Post('company/onboarding-participants')
  public async createRepresentants(
    @Req() req: any,
    @Body() representants: CompanyRepresentantDto[],
  ) {
    const email = req.user.email;
    await this.companiesService.createRepresentants(email, representants);
  }
}
