import {test} from "node:test"
import assert from "assert"
import { dummy } from "../utils/list_helper.js"

test('dummy returns one',()=>{
    const blogs=[]
    const result =dummy(blogs)
    assert.strictEqual(result,1)
})