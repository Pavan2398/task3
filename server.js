const express = require('express')
const app = express()


let books=[]
let idCounter = 1
app.use(express.json())



app.get('/books',(req,res)=>{
    res.json(books)
})

app.post('/books',(req,res)=>{
    const {title,author} = req.body

    if(!title || !author){
        return res.status(400).json({error: 'Title and author are required'})
    }
    const newBook = {
        id:idCounter++,
        title,
        author
    }
    books.push(newBook)
    res.status(201).json(newBook)
})


app.put('/books/:id',(req,res)=>{
    const bookId = parseInt(req.params.id)
    const {title,author} = req.body
    const book = books.find(b => b.id === bookId)
    if(!book){
        return res.status(404).json({error: 'Book not found'})
    }
    if(title) book.title = title
    if(author) book.author = author
    res.json(book)
})

app.delete('/books/:id',(req,res)=>{
    const bookId = parseInt(req.params.id)
    const bookIndex = books.findIndex(b => b.id === bookId)
    if(bookIndex === -1){
        return res.status(404).json({error: 'Book not found'})
    }
    const bookDeleted = books.splice(bookIndex, 1);
  res.json({ message: 'Book deleted', book: bookDeleted[0] });
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})