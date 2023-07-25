const request = require('supertest');
const app = require("../Express-Server");
const Post = require("../Model/post");
const User = require("../Model/user")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")


describe('test / post and its API',()=>{

    // beforeEach(async ()=>{

    // });

    // afterAll(async ()=>{
    //     await mongoose.connection.close();
    // });

    describe('/POST createPost', ()=>{

        test('should successfully created post',async ()=>{
            
            const token = "asdfghjkl"
            const post = {
                title:"test post",
                content:"this is a test post content"
            }

            jest.spyOn(jwt,'verify').mockResolvedValueOnce({
              id:'dummyId',
              title:"test post",
              content:"this is a test post content" 
            });

            jest.spyOn(Post.prototype,'save').mockResolvedValueOnce({});
            const response = await request(app)
            .post('/post/createPost')
            .set("Authorization",`Bearer ${token}`)
            .send(post)
            .expect(201);
            
            
        });

        test("should give approporiate response if it fails to create a new Post", async ()=>{
           
            const token = "asdfghjkl"
            const post = {
                title:"test post",
                content:"this is a test post content"
            }
            // {
            //     id:'dummyId',
            //     title:"test post",
            //     content:"this is a test post content" 
            //   }
            jest.spyOn(jwt,'verify').mockRejectedValueOnce({
                id:'dummyId',
                title:"test post",
                content:"this is a test post content" 
              });
             await request(app).post('/post/createPost').send(post).expect(401);

            jest.spyOn(Post.prototype,'save').mockRejectedValue(new Error("Internal server error"));
            const response = await request(app).post('/post/createPost').send(post).set("Authorization",`Bearer ${token}`)
            .expect(500);
            console.log(response._body);
        })
    })
})