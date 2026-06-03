import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QrCode } from './qr-code.entity';
import { Not, Repository } from 'typeorm';
import { deleteFromS3, uploadToS3 } from './s3.service';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectRepository(QrCode)
    private qrCodeRepository: Repository<QrCode>,
  ) {}

  async getQr(): Promise<QrCode | null> {
    const results = await this.qrCodeRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    return results[0] ?? null;
  }

  async uploadQr(file: Express.Multer.File): Promise<QrCode> {
    const { url, key } = await uploadToS3(file);
    const fileSize = file.size;

    return await this.qrCodeRepository.manager.transaction(async (manager) => {
      await manager.clear(QrCode);
      return await manager.save(QrCode, { qrPath: url, fileSize, s3Key: key });
    });
  }

  async deleteQr() {
    const getQr = await this.getQr();

    if (getQr?.s3Key) {
      await deleteFromS3(getQr.s3Key);
    }

    await this.qrCodeRepository.clear();
  }
}
