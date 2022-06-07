const express = require('express')
const path = require('path')
const app = express()

// Definindo o template engine
app.set('view engine', 'ejs')


// ** Definindo os arquivos estáticos (Somente utilizando caso NÃO estiver usando o template engine) **
//const staticFolder = path.join(__dirname, 'views')
//const expressStatic = express.static(staticFolder)
//app.use(expressStatic)

// definindo os arquivos públicos
const publicFolder = path.join(__dirname, 'public')
const expressPublic = express.static(publicFolder)
app.use(expressPublic)

// rotas
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Digital Tech - Home'
    }) //sem o template engine: res.render('views/index ')
})

app.get('/posts', (req, res) => {
    res.render('posts', {
        title: 'Digital Tech - Posts'
    })
})

app.use((req, res) => { //404 error(not found)
    res.send(`<h2 align="center"> Página não encontrada </h2>`)     // Caso o usuário tente entrar numa página inexistente, aparece uma mensagem personalizada. 
})


// executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))