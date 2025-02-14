import { TodoRepository } from "../../repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface DeleteUseCase {
    execute(id:number): Promise<TodoEntity>;
}

export class DeleteById implements DeleteUseCase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    async execute(id:number): Promise<TodoEntity> {
        return await this.todoRepository.deleteById(id);
    }
}