const request = require("supertest");
const app = require('../Express-Server');
const User = require('../Model/user');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

describe('test/user and its APIs', () => {

    beforeEach(async () => {
        
    });

    afterAll(async ()=>{
        await mongoose.connection.close();
    })

    describe('/POST register', () => {
        // Our agenda is to test the /register API under different scenarios
        //We will mock/fake the actual save to DB.
        // We will use supertest for testing our APIs
        test('should register a new user', async () => {

            const userData = {
                email: "martinluther123@gmail.com",
                name: "martin",
                password: "1234"
            }

            // mock DB
            jest.spyOn(User.prototype, 'save').mockResolvedValueOnce({
                _id: "64ba102871ea3d1f3e8a05f1",
                email: "martinluther123@gmail.com",
                name: "martin",
                password: "$2b$10$1s2QoJ4ugGOTWC8GSCj9Kubcfy9TKAzGH81rt5nbrNeoFfiW22xLu",
                __v: 0
            });
            // _id:"64ba102871ea3d1f3e8a05f1",
            //    email:"martinluther123@gmail.com",
            //    name:"martin",
            //    password:"$2b$10$1s2QoJ4ugGOTWC8GSCj9Kubcfy9TKAzGH81rt5nbrNeoFfiW22xLu",
            //    __v:0

            // supertest

            const response = await request(app).post('/user/register').send(userData).expect(201);
            const resBody = response._body;
            console.log(resBody);
            expect(resBody.message).toBe("User registered successfully");
            expect(resBody.data.email).toBe(userData.email);
            expect(resBody.data.name).toBe(userData.name);
            expect(resBody.data.password).toBe("$2b$10$1s2QoJ4ugGOTWC8GSCj9Kubcfy9TKAzGH81rt5nbrNeoFfiW22xLu")


        })

        test('should give approporiate response if it fails to register a new user', async () => {

            jest.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('failed to create user'));
            const userData = {
                email: "martinluther123@gmail.com",
                name: "martin",
                password: "1234"
            }

            const response = await request(app).post('/user/register').send(userData).expect(500);
            // console.log(response._body);
            expect(response._body.errorDesc).toBe('data uploading failed');

        })

        test('should give approporiate response if it fails to encrypt password', async () => {

            jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error('encryption failed'));
            const userData = {
                email: "martinluther123@gmail.com",
                name: "martin",
                password: "1234"
            }

            const response = await request(app).post('/user/register').send(userData).expect(500);
            expect(response._body.errorDesc).toBe('Internal server error')
        })

    });

    describe('POST /login', () => {

        test('should show error if mongoDB call fails', async () => {
            const userData = {
                email: "martinluther123@gmail.com",
                password: "1234"
            }

            // Intentionally making user.findOne call fail. So, it will go to catch block of this.

            jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error("failed"));

            const response = await request(app).post('/user/login').send(userData).expect(500);
            console.log(response._body);
            expect(response._body.errorDesc).toBe("Something went wrong");
        });

        test("should fail if mongoDb returned null object", async () => {

            const userData = {
                email: "martinluther123@gmail.com",
                password: "1234"
            }


            jest.spyOn(User, "findOne").mockResolvedValue(null);
            const response = await request(app).post('/user/login').send(userData).expect(404);
            expect(response._body.errorDesc).toBe("your email is not registered");

        })

        test('should fail if mongoDb returned empty object', async () => {

            const userData = {
                email: "martinluther123@gmail.com",
                name: "martin"
            }

            jest.spyOn(User, 'findOne').mockResolvedValue({});
            const response = await request(app).post('/user/login').send(userData).expect(500);
            expect(response._body.errorDesc).toBe("Internal server error");
        })

        test('should fail if passowrds mismatch', async () => {

            const userData = {
                email: 'martinluther123@gmail.com',
                password: "1234"
            }

            jest.spyOn(User, 'findOne').mockResolvedValueOnce({});
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

            const response = await request(app).post('/user/login').send(userData).expect(403);
            expect(response._body.errorDesc).toBe("Email or password does not match");

        });

        test('should authenticate a user and return a token', async () => {

            const userData = {
                email: "martinluther123@gmail.com",
                password: "1234"
            }

            jest.spyOn(User, 'findOne').mockResolvedValueOnce({});
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

            const response = await request(app).post('/user/login').send(userData).expect(200);
            expect(User.findOne).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalled();
            expect(response._body.message).toBe("Authenticate successful!");
            expect(response._body.data).toBeDefined();
          
        })
    })



});

