import config from './env.js';

const corsOptions = {
  origin: (origin, callback) => {
    // In production, only allow the base domain
    const allowedOrigins = config.NODE_ENV === 'production' 
      ? ['https://coreyb.dev']
      : ['http://localhost:5173', 'http://127.0.0.1:5173'];
    
    console.log('CORS Check:', {
      origin,
      allowedOrigins,
      frontendUrl: config.FRONTEND_URL,
      nodeEnv: config.NODE_ENV
    });

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS Error:', {
        origin,
        allowedOrigins,
        matches: allowedOrigins.includes(origin)
      });
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token', 'Cookie', 'Authorization'],
  exposedHeaders: ['X-CSRF-Token', 'Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

export default corsOptions;