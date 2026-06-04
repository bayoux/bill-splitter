import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrCode } from './qr-code.entity';
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

    // Transaction ensures atomic replace: if save fails, the table is not left empty.
    return await this.qrCodeRepository.manager.transaction(async (manager) => {
      await manager.clear(QrCode);
      return await manager.save(QrCode, { qrPath: url, fileSize, s3Key: key });
    });
  }

  async deleteQr(): Promise<void> {
    const qr = await this.getQr();

    if (qr?.s3Key) {
      await deleteFromS3(qr.s3Key);
    }

    await this.qrCodeRepository.clear();
  }
}
