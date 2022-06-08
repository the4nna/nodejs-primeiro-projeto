const express = require('express') // os requires devem ser os primeiros elementos dentro do arquivo
const path = require('path')
const fs = require('fs')

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

// habilita server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true}))

// rotas
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Digital Tech - Home'
    }) //sem o template engine: res.render('views/index ')
})

app.get('/cadastro-posts', (req, res) => {
    const { c } = req.query
    res.render('cadastro-posts', {
        title: 'Digital Tech - Cadastrar Post',
        cadastrado: c
    }) //sem o template engine: res.render('views/index ')
})

app.post('/salvar-post', (req, res) => {
    const {titulo, texto} = req.body

    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)

    posts.push({
        titulo,
        texto,
    })

    const postsString = JSON.stringify(posts)
    fs.writeFileSync('./store/posts.json', postsString)

    res.redirect('/cadastro-posts?c=1')
})

app.get('/posts', (req, res) => {
    res.render('posts', {
        title: 'Digital Tech - Posts',
        posts: [
        {
            title: 'Novidade no mundo da tecnologia',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut nunc venenatis, imperdiet velit non, feugiat turpis. Phasellus faucibus libero vitae luctus cursus. Morbi bibendum tincidunt accumsan. Quisque id luctus velit. Donec et sapien eleifend, aliquam purus non, mollis nulla. Fusce molestie nulla nunc, nec mattis augue ultricies ac.',
            stars: 3
        },
        {
            title: 'Criando um servidor com node.js',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut nunc venenatis, imperdiet velit non, feugiat turpis. Phasellus faucibus libero vitae luctus cursus. Morbi bibendum tincidunt accumsan. Quisque id luctus velit. Donec et sapien eleifend, aliquam purus non, mollis nulla. Fusce molestie nulla nunc, nec mattis augue ultricies ac.'
        }, 
        {
            title: 'JS é a linguagem mais usada no mundo',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut nunc venenatis, imperdiet velit non, feugiat turpis. Phasellus faucibus libero vitae luctus cursus. Morbi bibendum tincidunt accumsan. Quisque id luctus velit. Donec et sapien eleifend, aliquam purus non, mollis nulla. Fusce molestie nulla nunc, nec mattis augue ultricies ac.',
            stars: 5
        }, 
    ]
    })
})

app.use((req, res) => { //404 error(not found)
    res.send(`<h2 align="center"> Página não encontrada </h2>`)     // Caso o usuário tente entrar numa página inexistente, aparece uma mensagem personalizada. 
})


// executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))