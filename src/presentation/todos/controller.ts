import {Request, Response} from "express";
const todos = [
    {id:1, text: "buy milk", createdAt: new Date()},
    {id:2, text: "buy bread", createdAt: new Date()},
    {id:3, text: "buy butter", createdAt: null },
];

export  class TodosController {

    //*DI
    constructor() {
    }
    public getAllTodos = (req:Request,res:Response)=>{
        res.json(todos);
        return;
    }
    public getTodo = (req:Request,res:Response) => {

        const id = +(req.params.id);
        if(isNaN(id)){
            res.status(400).json({error: 'ID argument is not number'});
            return;
        }

        const todo = todos.find(x => x.id === id );
        (todo)
            ? res.json(todo)
            : res.status(404).json({error: `TODO with id ${id} Not Found`});
     }

     public createTodo = (req: Request, res:Response) =>{
        const { text } = req.body;

        if ( !text  ) {
            res.status(400).json({error : 'Text property is required'});
            return
        }

        const  newTodo = {
            id : todos.length + 1,
            text : text,
            createdAt: null,
        };

         todos.push(newTodo);
         res.json(newTodo);
     }

     public  updateTodo = (req: Request, res:Response) =>{

        const id = +(req.params.id);
        if(isNaN(id)){
            res.status(400).json({error: 'ID argument is not number'});
            return;
        }

        const todo = todos.find(x => x.id === id );
        if(!todo) {
            res.status(404).json({error: `TODO with id ${id} Not Found`});
            return;
        }

        const { text } = req.body;
        todo.text = text || todo.text;

        res.json(todo)
     }

     public deleteTodo = (req:Request, res:Response) =>{
        const id = +(req.params.id);
         if(isNaN(id)){
             res.status(400).json({error: 'ID argument is not number'});
             return;
         }

         const todo = todos.find(x => x.id === id );
         if(!todo) {
             res.status(404).json({error: `TODO with id ${id} Not Found`});
             return;
         }

         todos.splice(todos.indexOf(todo),1);
         res.json(todo);
         return;

     }
}