import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QrCode } from './qr-сode.entity';
import { Not, Repository } from 'typeorm';
import { deleteFromS3, uploadToS3 } from './s3.service';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectRepository(QrCode)
    private qrCodeRepository: Repository<QrCode>,
  ) {}

  async getQr(): Promise<QrCode | null> {
    return await this.qrCodeRepository.findOne({ where: { id: Not(0) } });
  }

  async uploadQr(file: Express.Multer.File): Promise<QrCode> {
    await this.qrCodeRepository.clear();

    const url = await uploadToS3(file);
    const fileSize = file.size;

    return await this.qrCodeRepository.save({ qrPath: url, fileSize });
  }

  async deleteQr() {
    const getQr = await this.getQr();

    if (getQr?.qrPath) {
      const key = getQr.qrPath.split('/').pop();
      await deleteFromS3(key!);
    }

    await this.qrCodeRepository.clear();
  }
}
