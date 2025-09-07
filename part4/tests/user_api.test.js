import mongoose from "mongoose";
import supertest from "supertest";
import { test, after, describe, beforeEach} from "node:test";
import assert from "assert";

import bcrypt from "bcrypt"
import app from "../app.js"
import { User } from "../models/user.js";

const api = supertest(app)


beforeEach(async()=>{
    const MONGODB = process.env.TEST_MONGO_URL
    await mongoose.connect(MONGODB)

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("password",10)
    const user = new User({username:"bini", passwordHash})
    await user.save();
})

after(async () => {
    await mongoose.connection.close();
  });


describe("creating a new user", ()=>{
    test.only("creates a new username", async()=>{
        const userAtStart = await User.find({})

        const newUser = {
            username:"shyam",
            name:"santosh regmi",
            password:"pass123"
        }

        await api.post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type",/application\/json/)

        const userAtEnd = await User.find({})
        assert.strictEqual(userAtEnd.length,userAtStart.length+1)
    })

    test.only("if username is already taken, returns 400 status code", async()=>{
        const existing = {
            username:"shyam",
            name:"santosh regmi",
            password:"pass123"
        }

        await api.post("/api/users").send(existing).expect(201)

        const newUser = {
            username:"shyam",
            name:"ganesh regmi",
            password:"pass1234"
        }

        




        const result = await api.post("/api/users")
        .send(newUser)
        .expect(400)

        assert.match(result.body.error,/username must be unique/)
       
    })

    test.only("username must be atleast 3 character long", async()=>{
        const newUser = {
            username:"sh",
            name:"santosh regmi",
            password:"pass123"
        }

        const result = await api.post("/api/users")
        .send(newUser)
        .expect(400)

        assert.match(result.body.error,/username must be atleast 3 characters long/)
    })


    test.only("password must be atleast 3 character long", async()=>{
        const newUser = {
            username:"shyam",
            name:"santosh regmi",
            password:"pa"
        }

        const result = await api.post("/api/users")
        .send(newUser)
        .expect(400)

        assert.match(result.body.error,/password must be atleast 3 characters long/)
    })

    test.only("username and password must be contain",async()=>{
        const noUsername = {
            name:"santosh regmi",
            password:"pass123"
        }

        const noPassword = {
            username:"shyam",
            name:"santosh regmi",
        }

        await api.post("/api/users").send(noUsername).expect(400)
        await api.post("/api/users").send(noPassword).expect(400)
    })


})