import { Module } from '@nestjs/common';
import { FilesService } from "./files.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { File } from "src/models/files.model";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [
    SequelizeModule.forFeature([File]),
  ]
})
export class FilesModule {}