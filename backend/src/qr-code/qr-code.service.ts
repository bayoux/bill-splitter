import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QrCode } from './qr-сode.entity';
import { Not, Repository } from 'typeorm';
import { basename } from 'path';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectRepository(QrCode)
    private qrCodeRepository: Repository<QrCode>,
  ) {}

  async getQr(): Promise<QrCode | null> {
    return await this.qrCodeRepository.findOne({ where: { id: Not(0) } });
  }

  async uploadQr(qrPath: string): Promise<QrCode> {
    await this.qrCodeRepository.clear();
    const filename = basename(qrPath);
    return await this.qrCodeRepository.save({ qrPath: `uploads/${filename}` });
  }

  async deleteQr() {
    await this.qrCodeRepository.clear();
  }
}
