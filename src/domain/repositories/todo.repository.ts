import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto";



export abstract class TodoRepository{

    abstract create(createTodo:CreateTodoDto): Promise<TodoEntity>;
    //todo: paginación
    abstract getAll():Promise<TodoEntity[]>;
    abstract getById(id:number):Promise<TodoEntity>
    abstract updateById(updateTodo:UpdateTodoDto):Promise<TodoEntity>;
    abstract deleteById(id:number):Promise<TodoEntity>;
}