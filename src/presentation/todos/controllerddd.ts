import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain";

export class TodosController {

    //*DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    public getAllTodos = async ( req: Request, res: Response ) => {
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    }
    public getTodo = async ( req: Request, res: Response ) => {
        try {
            const id = Number(req.params.id);
            const todo = await this.todoRepository.getById(id);
            res.json(todo);
        } catch ( error ) {
            res.status(400).send({ error : error });
        }
    }

    public createTodo = async ( req: Request, res: Response ) => {
        try {
            const [error, createTodoDto] = CreateTodoDto.create(req.body);

            if (error) {
                res.status(400).json({ error : error });
                return;
            }
            const newTodo = await this.todoRepository.create(createTodoDto!);
            res.json(newTodo);

        } catch ( error ) {
            res.status(400).send({ error : error });
        }
    }

    public updateTodo = async ( req: Request, res: Response ) => {
        try {
            const id = +(req.params.id);
            const [error, updatedTodoDto] = UpdateTodoDto.update({ ...req.body, id })

            if (error) {
                res.status(400).json({ error : error });
                return;
            }
            const updateTodo = await this.todoRepository.updateById(updatedTodoDto!)
            res.json(updateTodo)
        } catch ( error ) {
            res.status(400).json({ error : error });
        }
    }

    public deleteTodo = async ( req: Request, res: Response ) => {
        try {
            const id = +(req.params.id);
            const todo = await this.todoRepository.deleteById(id);
            res.json(todo);
        } catch ( error ) {
            res.status(400).json({ error : error });
        }
        return;
    }
}