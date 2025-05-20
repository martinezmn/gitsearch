import { Test, TestingModule } from '@nestjs/testing';
import {
  ArgumentsHost,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { Request, Response } from 'express';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  let mockRequest: Request;
  let mockResponse: Response;
  let mockHost: ArgumentsHost;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);

    mockRequest = {
      path: '/test',
      method: 'GET',
      headers: { 'x-access-token': 'token' },
    } as unknown as Request;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ArgumentsHost;
  });

  it('should return the correct status and error response when HttpException is thrown', () => {
    const exception = new ForbiddenException('Forbidden test message');
    filter.catch(exception, mockHost);
    expect(mockResponse.json).toHaveBeenCalledWith(exception.getResponse());
  });

  it('should return a 500 status and log the error when an unknown exception is thrown', () => {
    const exception = new Error('Unknown test error');

    const spyOnLogger = jest
      .spyOn(filter['logger'], 'error')
      .mockImplementation(() => {});

    filter.catch(exception as HttpException, mockHost);

    expect(spyOnLogger).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: 'Error on the api please try again later.',
      error: 'Internal Server Error',
    });
  });
});
