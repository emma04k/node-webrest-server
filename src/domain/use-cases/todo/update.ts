import { CreateTodoDto, UpdateTodoDto } from "../../dtos";
import { TodoRepository } from "../../repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface UpdateUseCase {
    execute( dto: UpdateTodoDto ): Promise<TodoEntity>;
}

export class UpdateById implements UpdateUseCase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    async execute( dto: UpdateTodoDto ): Promise<TodoEntity> {
        return await this.todoRepository.updateById(dto);
    }
}