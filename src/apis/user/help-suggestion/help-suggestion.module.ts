import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpSuggestionController } from './help-suggestion.controller';
import { HelpSuggestionSchema } from './help-suggestion.schema';
import { HelpSuggestionService } from './help-suggestion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HelpSuggestion', schema: HelpSuggestionSchema },
    ]),
  ],
  providers: [HelpSuggestionService],
  controllers: [HelpSuggestionController],
})
export class HelpSuggestionModule { }
