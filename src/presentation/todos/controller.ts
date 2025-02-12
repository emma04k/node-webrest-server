import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

export class TodosController {

    //*DI
    constructor() {
    }

    public getAllTodos = async ( req: Request, res: Response ) => {
        res.json(await prisma.todo.findMany());
        return;
    }
    public getTodo = async ( req: Request, res: Response ) => {

        const id = +(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error : 'ID argument is not number' });
            return;
        }

        const todo = await prisma.todo.findFirst({
            where : { id }
        });
        (todo)
            ? res.json(todo)
            : res.status(404).json({ error : `TODO with id ${id} Not Found` });
    }

    public createTodo = async ( req: Request, res: Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error : error });
            return;
        }

        const newTodo = await prisma.todo.create({
            data : createTodoDto!
        });
        res.json(newTodo);
    }

    public updateTodo = async ( req: Request, res: Response ) => {
        const id = +(req.params.id);
        const [error,updatedTodoDto] = UpdateTodoDto.update({...req.body, id})

        if (error) {
            res.status(400).json({ error : error });
            return;
        }

        const todo = await prisma.todo.findFirst({
            where : { id }
        });

        if (!todo) {
            res.status(404).json({ error : `TODO with id ${id} Not Found` });
            return;
        }

        const updateTodo = await prisma.todo.update({
            where : { id },
            data : updatedTodoDto!.values
        });

        res.json(UpdateTodoDto)
    }

    public deleteTodo = async ( req: Request, res: Response ) => {
        const id = +(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error : 'ID argument is not number' });
            return;
        }

        const todo = await prisma.todo.findFirst({
            where : { id }
        });

        if (!todo) {
            res.status(404).json({ error : `TODO with id ${id} Not Found` });
            return;
        }
        await prisma.todo.delete({
            where : { id },
        });

        res.json(todo);
        return;

    }
}