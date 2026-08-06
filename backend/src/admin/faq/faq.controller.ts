import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '@/auth/decorators/public.decorator';
import { Roles } from '@/auth/decorators/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { UserType } from '@/users/schemas/user.schema';
import { AddFaqDto, UpdateFaqDto } from './dtos/faq.dto';
import { FaqService } from './faq.service';
import { FaqType } from './schemas/faq.schema';

@ApiTags('Admin')
@Controller('admin/faqMgmt')
export class FaqController {
  public constructor(private faqService: FaqService) {}

  @Version('1')
  @Public()
  @Get('getAllFAQ')
  public async getAllFaqs(@Query('type') type?: FaqType) {
    const data = await this.faqService.findAll(type);
    return { status: true, message: 'OK', data };
  }

  @Version('1')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Post('addFAQ')
  public async addFaq(@Body() dto: AddFaqDto) {
    const data = await this.faqService.create(dto);
    return { status: true, message: 'FAQ created successfully', data };
  }

  @Version('1')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Put('updateFAQ/:id')
  public async updateFaq(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    const data = await this.faqService.update(id, dto);
    return { status: true, message: 'FAQ updated successfully', data };
  }

  @Version('1')
  @UseGuards(RolesGuard)
  @Roles(UserType.Admin)
  @Delete('deleteFAQ/:id')
  public async deleteFaq(@Param('id') id: string) {
    await this.faqService.remove(id);
    return { status: true, message: 'FAQ deleted successfully' };
  }
}
