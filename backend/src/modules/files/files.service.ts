import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from "@nestjs/sequelize";
import { File } from "src/models/files.model";
import { Transaction } from "sequelize";

@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private fileModel: typeof File) {}

  async createFile(file: any, productId: number, transaction: Transaction): Promise<File> {
    try {
      const fileName = uuid.v4() + path.extname(file.originalname);
      const filePath = path.resolve(__dirname, '..', '..', '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      const fileDb = await this.fileModel.create({
        name: fileName,
        originalName: file.originalname,
        productId
      }, { transaction });
      return fileDb;
    } catch (e) {
      console.log(e);
      throw new HttpException('Error while writing file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeFileWT(fileName: string, transaction: Transaction) {
    try {
      const filePath = path.resolve(__dirname, '..', '..', '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      fs.unlinkSync(path.join(filePath, fileName));
      await this.fileModel.destroy({
        where: {
          name: fileName
        },
        transaction
      });
    } catch (e) {
      console.log(e);
      throw new HttpException('Error while removing file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}