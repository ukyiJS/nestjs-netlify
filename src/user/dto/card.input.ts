import { InputType, PartialType } from '@nestjs/graphql';
import { Card } from '../entities/card.entity';

@InputType()
export class CardInput extends PartialType(Card, InputType) {}
