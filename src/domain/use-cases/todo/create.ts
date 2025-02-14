import { CreateTodoDto } from "../../dtos";
import { TodoRepository } from "../../repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface CreateUseCase {
    execute( dto: CreateTodoDto ): Promise<TodoEntity>;
}

export class Create implements CreateUseCase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    async execute( dto: CreateTodoDto ): Promise<TodoEntity> {
        return await this.todoRepository.create(dto);
    }
}