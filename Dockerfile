# Use uma imagem do Node.js como base
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação
RUN npm run build

# Exponha a porta em que a aplicação rodará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
