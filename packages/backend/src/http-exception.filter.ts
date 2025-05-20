import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      const status = exception.getStatus();
      const error = exception.getResponse();
      response.status(status).json(error);
    } catch (err) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
        message: 'Error on the api please try again later.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
      this.logger.error(err, exception);
    }
  }
}
