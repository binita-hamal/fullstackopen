

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

export const mostBlogs = (blogs)=>{

    let hash={}
    let allAuthors = blogs.map(b=>{
        return b.author
    })

    //['bin','jhon','bin] 
    for(let a of allAuthors){
        hash[a] =( hash[a] || 0 ) + 1
    }
    //{
    //"bini":2,
    //"jhon":1
    //}

    let max=0
    let maxAuthor

    for(let author in hash){
        if(hash[author] > max){
            max = hash[author]
            maxAuthor = author
        }
    }

    return {
        author:maxAuthor,
        blogs:max
    }

}

export const mostLikes=(blogs)=>{
    const hash={}
    // let allAuthors = blogs.map(b=>{
    //     return b.author
    // })

    for(let b of blogs){
        hash[b.author] = (hash[b.author] || 0) + b.likes 
    }

    let max=0;
    let maxAuthor

    for(let author in hash){
        if(hash[author] > max){
            max = hash[author]
            maxAuthor = author
        }
    }

    return {
        author:maxAuthor,
        likes: max
    }



}