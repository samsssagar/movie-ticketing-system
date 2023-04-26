import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const errors = exception.getResponse()['message'];
        const validationErrors = [];
        errors.forEach(error => {
            validationErrors.push(error);
        });

        response.status(400).json({
            statusCode: 400,
            message: 'Validation error',
            errors: validationErrors,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
