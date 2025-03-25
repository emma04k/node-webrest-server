import request from 'supertest';
import { testServer } from "../../testServer";
import { prisma } from "../../../src/data/postgres";


describe('Todo route testing',()=>{
    beforeAll(async () => {
        await testServer.start();
    })

    afterAll(() => {
        testServer.close();
    })

    beforeEach(async () => {
        await  prisma.todo.deleteMany()
    });

    const date = new Date();
    const todo1 = {text : `TODO test ${date.toLocaleString()}`};

    test('Should return TODOs api/todos',async ()=>{
        await  prisma.todo.create({
           data: todo1
        })

        const {body} = await request(testServer.app)
            .get('/api/todos')
            .expect(200)

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(1);
        expect(body[0].text).toBe(todo1.text);
        expect(body[0].completedAt).toBeUndefined();

    });

    test('Should return TODO api/todos/:id',async ()=>{

        const todo = await  prisma.todo.create({
            data: todo1
        })

        const {body} = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
         })

    });

    test('Should return 404 Not Found api/todos/:id',async ()=>{

        const todoId = 999;
        const {body} = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);

    });

    test('Should return a new TODO api/todos/:id',async ()=>{

        const {body} = await request(testServer.app)
            .post(`/api/todos`)
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
                id: expect.any(Number),
                text: todo1.text,
            });

    });

    test('Should return an error if text is empty api/todos',async ()=>{

        const {body} = await request(testServer.app)
            .post(`/api/todos`)
            .send({text:''})
            .expect(400);
        expect(body).toEqual({ error: 'Text property is required' });

    });

    test('Should return an updated TODO api/todos/:id',async ()=>{

        const todo = await  prisma.todo.create({
            data: todo1
        })

        const newText = 'test update';
        const completedAt = '2025-03-25'
        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({text:newText, completedAt:completedAt})
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: newText,
            completedAt: "2025-03-25T00:00:00.000Z"
        });

    });
    test('Should return 404 if TODO not found api/todos/:id',async ()=>{

        const newText = 'test update';
        const completedAt = '2025-03-25'
        const {body} = await request(testServer.app)
            .put(`/api/todos/${999}`)
            .send({text:newText, completedAt:completedAt})
            .expect(404);

        expect(body).toEqual({"error": "Todo with id 999 not found"} );
    });

    test('Should return an updated TODO only the date api/todos/:id',async ()=>{

        const todo = await  prisma.todo.create({
            data: todo1
        })
        const completedAt = '2025-03-25'
        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({completedAt:completedAt})
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: "2025-03-25T00:00:00.000Z"
        });
    });

    test('Should return an deleted TODO api/todos/:id',async ()=>{

        const todo = await  prisma.todo.create({
            data: todo1
        })
        const completedAt = '2025-03-25'
        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
        });
    });

    test('Should return 404 if TODO do not exist api/todos/:id',async ()=>{

        const {body} = await request(testServer.app)
            .delete(`/api/todos/${999}`)
            .expect(404);

        expect(body).toEqual({ error: 'Todo with id 999 not found' });
    });

});