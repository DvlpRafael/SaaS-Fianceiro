const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'b2568d7f2300218cb8f3f756e9a7df696693a3076fafb75f3dc442996a2f31da238d371829020e02b4b7cdb9c7f24f43de50280a63f92862185140d8b07207c6'; // Substitua por uma chave secreta forte

// Função para gerar um JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' }); // Expira em 1 hora
};

// Rota de registro
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        // Criar um novo usuário
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

// Rota de login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Comparar a senha
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Gerar um token JWT
        const token = generateToken(user._id);

        res.status(200).json({ token });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};