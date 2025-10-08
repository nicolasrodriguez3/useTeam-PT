import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entity: string, id: string) {
    super(`${entity} con ID '${id}' no encontrado`, HttpStatus.NOT_FOUND);
  }
}

export class InvalidPositionException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class DuplicatePositionException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
