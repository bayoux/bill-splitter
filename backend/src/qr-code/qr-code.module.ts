import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { QrCode } from './qr-сode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QrCode])],
  providers: [QrCodeService],
  controllers: [QrCodeController],
})
export class QrCodeModule {}
