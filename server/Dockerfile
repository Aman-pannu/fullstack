FROM node:18-alpine
WORKDIR /Users/amandeepsingh/Downloads/fullstack-form-crud-app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
