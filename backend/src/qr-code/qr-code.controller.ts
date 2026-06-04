import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { QrCode } from './qr-code.entity';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Get()
  getOne(): Promise<QrCode | null> {
    return this.qrCodeService.getQr();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        cb(null, allowed.includes(file.mimetype));
      },
    }),
  )
  create(@UploadedFile() file: Express.Multer.File): Promise<QrCode> {
    return this.qrCodeService.uploadQr(file);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(): Promise<void> {
    return this.qrCodeService.deleteQr();
  }
}
