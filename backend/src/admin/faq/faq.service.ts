import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddFaqDto, UpdateFaqDto } from './dtos/faq.dto';
import { Faq, FaqDocument, FaqType } from './schemas/faq.schema';

@Injectable()
export class FaqService {
  public constructor(@InjectModel(Faq.name) private faqModel: Model<Faq>) {}

  public async findAll(type?: FaqType) {
    const faqs = await this.faqModel
      .find(type ? { type } : {})
      .sort({ createdAt: 1 });
    return faqs.map((faq) => this.toDto(faq));
  }

  public async create(dto: AddFaqDto) {
    const faq = await this.faqModel.create(dto);
    return this.toDto(faq);
  }

  public async update(id: string, dto: UpdateFaqDto) {
    const faq = await this.faqModel.findByIdAndUpdate(
      id,
      { question: dto.question, answer: dto.answer },
      { new: true },
    );
    if (!faq) throw new NotFoundException('FAQ not found');
    return this.toDto(faq);
  }

  public async remove(id: string) {
    const faq = await this.faqModel.findByIdAndDelete(id);
    if (!faq) throw new NotFoundException('FAQ not found');
  }

  private toDto(faq: FaqDocument) {
    return {
      id: faq._id.toString(),
      question: faq.question,
      answer: faq.answer,
      type: faq.type,
      createdAt: faq.get('createdAt'),
      updatedAt: faq.get('updatedAt'),
    };
  }
}
