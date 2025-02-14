import { TodoRepository } from "../../repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface GetByIdUseCase {
    execute(id:number): Promise<TodoEntity>;
}

export class GetById implements GetByIdUseCase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }
    async execute(id:number): Promise<TodoEntity> {
        return await this.todoRepository.getById(id);
    }
}