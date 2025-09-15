import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"
import { describe,test ,expect, vi} from "vitest"
import blogService from "../services/blogs"

vi.mock("../services/blogs")

describe("<BlogForm/>", ()=>{
    test("form calls the event handler it receives as props with right details when a new blog is created",async()=>{

        const mockCreateBlog = vi.fn()
        const user = userEvent.setup()

        blogService.create.mockResolvedValue({
            title:"volcano erruption",
            author:"bini",
            url : "http://gogle.com"
        })


        render(<BlogForm addBlog={mockCreateBlog}/>)

        const title = screen.getByLabelText(/title/i)
        const author = screen.getByLabelText(/author/i)
        const url = screen.getByLabelText(/url/i)
        const createButton = screen.getByText("create")


        await user.type(title,"volcano erruption")
        await user.type(author,"bini")
        await user.type(url,"http://gogle.com")


        await user.click(createButton)
        expect(mockCreateBlog).toHaveBeenCalledTimes(1)

        expect(mockCreateBlog).toHaveBeenCalledWith({
            title:"volcano erruption",
            author:"bini",
            url : "http://gogle.com"
        })

    })
})