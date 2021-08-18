import { InputType, OmitType } from '@nestjs/graphql';
import { Card } from '../entities/card.entity';

@InputType()
export class CardInput extends OmitType(Card, [] as const, InputType) {}
