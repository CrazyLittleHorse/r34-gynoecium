import { Module } from '@nestjs/common';
import { TransitModule } from './transit/transit.module';

@Module({
  imports: [TransitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
