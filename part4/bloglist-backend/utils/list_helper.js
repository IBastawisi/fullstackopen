/* eslint-disable no-unused-vars */
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0) / blogs.length
}

const favoriteBlog = blogs => {
  const blog = blogs.find(b => b.likes === Math.max(...blogs.map(b => b.likes)))

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = blogs => {
  function countBlogsByAuthor(objectArray) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj.author
      let ob = acc.find(ob => ob.author === key)
      if (!ob) {
        ob = { author: key, blogs: 0 }
        acc.push(ob)
      }
      ob.blogs += 1
      return acc
    }, [])
  }
  let authors = countBlogsByAuthor(blogs)
  return authors.find(author => author.blogs === Math.max(...authors.map(a => a.blogs)))
}

const mostLikes = blogs => {
  function countlikesByAuthor(objectArray) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj.author
      let ob = acc.find(ob => ob.author === key)
      if (!ob) {
        ob = { author: key, likes: 0 }
        acc.push(ob)
      }
      ob.likes += obj.likes
      return acc
    }, [])
  }
  let authors = countlikesByAuthor(blogs)
  return authors.find(author => author.likes === Math.max(...authors.map(a => a.likes)))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}