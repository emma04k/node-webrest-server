import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { Create, DeleteById, GetAll, GetById, TodoRepository, UpdateById } from "../../domain";

export class TodosController {

    //*DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    public getAllTodos = ( req: Request, res: Response ) => {
        new GetAll(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }));
    }
    public getTodo = ( req: Request, res: Response ) => {
        const id = Number(req.params.id);
        new GetById(this.todoRepository)
            .execute(id)
            .then(todo => res.json({ todo }))
            .catch(error => res.status(400).json({ error }));
    }

    public createTodo = ( req: Request, res: Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error : error });
            return;
        }

        new Create(this.todoRepository)
            .execute(createTodoDto!)
            .then(newTodo => res.json(newTodo))
            .catch(error => res.status(400).json({ error }));
    }

    public updateTodo = ( req: Request, res: Response ) => {
        const id = +(req.params.id);
        const [error, updatedTodoDto] = UpdateTodoDto.update({ ...req.body, id })

        if (error) {
            res.status(400).json({ error : error });
            return;
        }

        new UpdateById(this.todoRepository)
            .execute(updatedTodoDto!)
            .then(updTodo => res.json(updTodo))
            .catch(error => res.status(400).json({ error }));

    }

    public deleteTodo = ( req: Request, res: Response ) => {
        const id = +(req.params.id);
        new DeleteById(this.todoRepository)
            .execute(id)
            .then(deleted => res.json({ deleted }))
            .catch(error => res.status(400).json({ error }));
    }
}