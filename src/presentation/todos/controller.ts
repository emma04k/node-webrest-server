import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { Create, CustomError, DeleteById, GetAll, GetById, TodoRepository, UpdateById } from "../../domain";

export class TodosController {

    //*DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    private handleError = (res: Response,  error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).send({error: error.message});
            return;
        }
        //grabar log
        res.status(500).send({error : 'Internal Server Error - check logs'});
    }

    public getAllTodos = ( req: Request, res: Response ) => {
        new GetAll(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => this.handleError(res,error));
    }
    public getTodo = ( req: Request, res: Response ) => {
        const id = Number(req.params.id);
        new GetById(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => this.handleError(res,error));
    }

    public createTodo = ( req: Request, res: Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error : error });
            return;
        }

        new Create(this.todoRepository)
            .execute(createTodoDto!)
            .then(newTodo => res.status(201).json(newTodo))
            .catch(error => this.handleError(res,error));
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
            .catch(error => this.handleError(res,error));

    }

    public deleteTodo = ( req: Request, res: Response ) => {
        const id = +(req.params.id);
        new DeleteById(this.todoRepository)
            .execute(id)
            .then(deleted => res.json(deleted))
            .catch(error => this.handleError(res,error));
    }
}