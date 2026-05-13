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
import { QrCodeService } from './qr-code.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}
  @Get()
  getOne() {
    return this.qrCodeService.getQr();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          cb(null, `qr-${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(@UploadedFile() file: any) {
    return this.qrCodeService.uploadQr(file.path);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteQr() {
    return this.qrCodeService.deleteQr();
  }
}
