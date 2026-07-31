import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ContactPerson {
  @Prop() salutation!: string;
  @Prop() firstName!: string;
  @Prop() lastName!: string;
  @Prop() email!: string;
  @Prop() phoneNumber!: string;
  @Prop() language!: string;
  @Prop() type!: string;
}

export const ContactPersonSchema = SchemaFactory.createForClass(ContactPerson);
