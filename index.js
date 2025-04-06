require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const app = express();

// Configuração do middleware
app.use(cors());
app.use(express.json());

// Configuração do cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Endpoint para gerar URL pré-assinada
app.post('/generate-presigned-url', async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ error: 'Key é obrigatória' });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ResponseContentDisposition: `attachment; filename="${key}"`
    });

    // Gera URL pré-assinada válida por 1 hora
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    res.json({ url });
  } catch (error) {
    console.error('Erro ao gerar URL pré-assinada:', error);
    res.status(500).json({ error: 'Erro ao gerar URL pré-assinada' });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API de URLs pré-assinadas está funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})