import { Injectable } from '@nestjs/common';
import { ImportsRepository } from './import.repo';
import { PaginationQueryType } from '../shared/models/pagination.model';
import { CreateImportInputType, UpdateImportInputType } from './import.model';

@Injectable()
export class ImportsService {
  constructor(private readonly repo: ImportsRepository) {}

  findAll(query: PaginationQueryType) {
    return this.repo.getImports(query);
  }

  create(payload: CreateImportInputType) {
    return this.repo.createImport(payload);
  }

  update(id: string, payload: UpdateImportInputType) {
    return this.repo.updateImport(id, payload);
  }

  remove(id: string) {
    return this.repo.deleteImport(id);
  }
}