import { setupServer } from 'msw/node';
import { handlers } from './handles';

// Cria o servidor com os handlers definidos
export const server = setupServer(...handlers);

server.listen()