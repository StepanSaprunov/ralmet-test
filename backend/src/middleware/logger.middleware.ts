
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getCurrentDate } from "src/utils/get-current-date";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log({
      date: getCurrentDate(),
      ip: req.ip,
      method: req.method,
      url: fullUrl,
      body: req.body,
    })
    next();
  }
}
