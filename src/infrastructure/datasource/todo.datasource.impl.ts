import { CreateTodoDto, TodoDatasource, TodoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain";
import { prisma } from "../../data/postgres";


export class TodoDatasourceImpl implements TodoDatasource {

    async create( createTodo: CreateTodoDto ): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data : createTodo!
        });

        return TodoEntity.fromObject(newTodo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(x => TodoEntity.fromObject(x));
    }

    async getById( id: number ): Promise<TodoEntity> {

        const todo = await prisma.todo.findFirst({
            where : { id }
        });

        if(!todo){
            throw `Todo with id ${id} not found`;
        }
        return TodoEntity.fromObject(todo);
    }

    async updateById( updateTodo: UpdateTodoDto ): Promise<TodoEntity> {
        const {id} = updateTodo;

        const todo = await this.getById(id);

        const updTodo = await prisma.todo.update({
            where : { id },
            data : updateTodo!.values
        });

        return TodoEntity.fromObject(updTodo);
    }

    async deleteById( id: number ): Promise<TodoEntity> {

        const todo = await this.getById(id);

        const todoDeleted = await prisma.todo.delete({
            where : { id },
        });

        return TodoEntity.fromObject(todoDeleted);
    }
}