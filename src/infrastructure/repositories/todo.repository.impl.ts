import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository } from "../../domain";
import { UpdateTodoDto } from "../../domain";
import { prisma } from "../../data/postgres";


export class TodoDataRepositoryImpl implements TodoRepository {
    constructor(
        private readonly datasource:TodoDatasource,
    ) {
    }

    async create( createTodo: CreateTodoDto ): Promise<TodoEntity> {
        return this.datasource.create(createTodo);
    }

    async getAll(): Promise<TodoEntity[]> {
       return this.datasource.getAll();
    }

    async getById( id: number ): Promise<TodoEntity> {
        return this.datasource.getById(id);
    }

    async updateById( updateTodo: UpdateTodoDto ): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodo);
    }

    async deleteById( id: number ): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }
}