# 📝 Fullstack 4-Field Form CRUD App (React + Node.js + MongoDB)

This project is a full-stack CRUD web application that uses:

* ✅ **React** for the front-end (client)
* ✅ **Node.js + Express** for the API server (backend)
* ✅ **MongoDB** as the database
* ✅ **Docker + Docker Compose** for deployment
* ✅ **Mongo Express** as a web-based DB UI

---

## 📁 Project Structure

```
project-root/
├── client/              # React frontend
├── server/              # Node.js Express backend
│   ├── index.js
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── docker-compose.yml   # Compose file to manage all services
└── README.md
```

---

## 🚀 Setup Instructions

### ✅ Prerequisites

* Docker installed ([https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop))

### 🛠 Run the App

```bash
git clone <repo-url>
cd project-root
docker-compose up --build
```

Then open:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000/records](http://localhost:5000/records)
* Mongo Express (DB UI): [http://localhost:8081](http://localhost:8081) (user/pass: admin/admin)

---

## 🖥 Frontend (React - `client/`)

A simple form with 4 input fields:

* `field1`, `field2`, `field3`, `field4`

Features:

* Add (Save) new record
* Edit existing record
* Delete record
* Validation (no empty fields)
* API integration (GET, POST, PUT, DELETE)

**API URL**: `http://localhost:5000/records`

---

## 🌐 Backend (Express API - `server/`)

### 🔧 `server/.env`

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/formdata
```

### 🔧 `server/index.js`

CRUD endpoints:

* `GET /records`
* `POST /records`
* `PUT /records/:id`
* `DELETE /records/:id`

Uses Mongoose to connect to MongoDB.

---

## 🐳 Docker Configuration

### ✅ `server/Dockerfile`

```Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

### ✅ `.dockerignore`

```
node_modules
.env
```

---

## 📦 docker-compose.yml

```yaml
version: '3.8'

services:
  client:
    build: ./client
    container_name: react-client
    ports:
      - "3000:3000"
    stdin_open: true
    tty: true
    environment:
      - CHOKIDAR_USEPOLLING=true
    depends_on:
      - api

  api:
    build: ./server
    container_name: node-api
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/formdata
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6
    container_name: mongo-db
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  mongo-express:
    image: mongo-express
    container_name: mongo-ui
    restart: always
    ports:
      - "8081:8081"
    environment:
      - ME_CONFIG_MONGODB_SERVER=mongo
      - ME_CONFIG_MONGODB_PORT=27017
      - ME_CONFIG_BASICAUTH_USERNAME=admin
      - ME_CONFIG_BASICAUTH_PASSWORD=admin
    depends_on:
      - mongo

volumes:
  mongo-data:
```

---

## ✅ Future Enhancements

* Add authentication (JWT or OAuth)
* Form field types (dropdowns, dates)
* Export/import records as CSV
* Responsive UI with Tailwind CSS or Material UI

---

## 📬 Feedback

Pull requests and suggestions welcome!

Happy hacking 👨‍💻🚀
