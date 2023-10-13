import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { userRouter } from './user/user';

const app = express();
const PORT = 3000;

// Swaggerのオプション設定
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat Server API',
      version: '1.0.0',
      description: 'API documentation for the chat server'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ['./src/**/*.ts'] // APIの定義が書かれているファイルのパス
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.send('Hello, Chat Server!');
});

app.use('/api', userRouter);

async function main(){
  try {
    await mongoose.connect('mongodb://localhost:27017/chat').catch(err => {
      console.error('Failed to connect to MongoDB:', err);
    });
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
   }catch (e){
    console.log(e)
  }
}

main();
