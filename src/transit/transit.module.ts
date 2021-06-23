import { HttpModule, Module } from '@nestjs/common';
import { TransitController } from './transit.controller';
import { TransitService } from './transit.service';

@Module({
  imports: [HttpModule],
  controllers: [TransitController],
  providers: [TransitService],
})
export class TransitModule {}
