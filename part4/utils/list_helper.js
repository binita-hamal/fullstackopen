

// const blogs = [
//     {
//       "title": "Learning Fullstack Development",
//       "author": "Binit A. Hamal",
//       "url": "https://myblog.com/learning-fullstack",
//       "likes": 10
//     },
//     {
//       "title": "Understanding React Hooks",
//       "author": "Jane Doe",
//       "url": "https://myblog.com/react-hooks",
//       "likes": 25
//     },
//     {
//       "title": "Mastering Node.js",
//       "author": "John Smith",
//       "url": "https://myblog.com/nodejs-mastery",
//       "likes": 18
//     }
//   ]


export const dummy = (blogs)=>{
    return 1;
}

export const totalLikes = (blogs)=>{
    let likes = blogs.map(b=>{
        return b.likes
    })

    return likes.reduce((acc,curr)=>{
        return acc + curr
    },0)

}


export const favoriteBlog = (blogs)=>{

    return blogs.reduce((max,blog)=>{
        return blog.likes > max.likes ? blog : max
    },blogs[0])
    
}