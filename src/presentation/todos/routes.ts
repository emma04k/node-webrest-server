import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataRepositoryImpl, TodoDatasourceImpl } from "../../infrastructure";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoDatasourceImpl =  new TodoDatasourceImpl();
        const todoRepositoryImpl = new TodoDataRepositoryImpl(todoDatasourceImpl)

        const todosController = new TodosController(todoRepositoryImpl);

        router.get('/', todosController.getAllTodos);
        router.get('/:id',todosController.getTodo);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);

        return router
    }

}