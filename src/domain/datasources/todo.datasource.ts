import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";
import { UpdateTodoDto } from "../dtos";



export abstract class TodoDatasource {

    abstract create(createTodo:CreateTodoDto): Promise<TodoEntity>;
    //todo: paginación
    abstract getAll():Promise<TodoEntity[]>;
    abstract getById(id:number):Promise<TodoEntity>
    abstract updateById(updateTodo:UpdateTodoDto):Promise<TodoEntity>;
    abstract deleteById(id:number):Promise<TodoEntity>;
}