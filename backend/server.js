const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// Importe as rotas existentes
const entradasRoute = require('./routes/entradas');
const saidasRoute = require('./routes/saidas');
const estoqueRoute = require('./routes/estoques');
const relatoriosRoute = require('./routes/relatorios');

// Importe as novas rotas de autenticação
const authRoutes = require('./routes/authRoutes');

// Middleware para habilitar o CORS
app.use(cors());

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Use as rotas existentes
app.use('/api', entradasRoute);
app.use('/api', saidasRoute);
app.use('/api', estoqueRoute);
app.use('/api/relatorios', relatoriosRoute);

// Use as rotas de autenticação
app.use('/auth', authRoutes); // As rotas de autenticação começarão com /auth

// String de conexão com o MongoDB Atlas
const uri = 'mongodb+srv://dvlprafael:qazwsx12aA_@clustersaas.kpv1uid.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSaaS';

// Conecte-se ao MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota de exemplo (apenas para testar se o servidor está funcionando)
app.get('/', (req, res) => {
    res.send('Servidor Back-end do seu SaaS está rodando!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});