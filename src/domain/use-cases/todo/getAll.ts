import { TodoRepository } from "../../repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface GetAllUseCase {
    execute(): Promise<TodoEntity[]>;
}

export class GetAll implements GetAllUseCase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    async execute(): Promise<TodoEntity[]> {
        return await this.todoRepository.getAll();
    }
}