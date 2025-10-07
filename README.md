# Product Management App

## Overview
This is a web application for managing products. The frontend is built with **React.js**, and the backend is powered by **Django REST Framework**. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on products. Authentication is handled using **JWT (JSON Web Tokens)**.

## Features
- User registration and login with JWT-based authentication
- Create, read, update, and delete products
- Responsive React.js frontend
- RESTful API built with Django REST Framework
- Mysql database for simplicity

## Tech Stack
- **Frontend**: React.js, Tailwind css
- **Backend**: Django, Django REST Framework, JWT (djangorestframework-simplejwt)
- **Database**: Mysql (development)
- **Other**: Python 3.x, Node.js


## Installation

### Prerequisites
- Python 3.x
- Node.js and npm
- Git

### Backend Setup
1. **Navigate to the backend directory**:
   ```bash
   cd backend
2. **Navigate to the backend directory**:
   ```bash
   cd backend
2. **Setup virtual environment**:
    ```bash 
   python -m venv venv
3. **Install dependencies**:
    ```bash
   pip install -r requirements.txt
4. **Run Migration**:
    ```bash
    python manage.py makemigrations
    python manage.py migrate

#### The backend API will be available at http://localhost:8000/.

### Frontend Setup
1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
2. **Install dependencies**:
    ```bash
    npm install
3. **Start the React development server**:
    ```bash
    npm run dev

#### The frontend will be available at http://localhost:3000/.

### API Endpoints
POST http://127.0.0.1:8000/auth/register/
###
POST http://127.0.0.1:8000/auth/login/
###
POST http://127.0.0.1:8000/auth/login/token/refresh/
###
POST http://127.0.0.1:8000/products/details/
###
PUT http://127.0.0.1:8000/products/details/{id}/
###
GET http://127.0.0.1:8000/products/details/
###
DELETE http://127.0.0.1:8000/products/details/{id}/

### Usage
1. **Open http://localhost:3000/ in your browser.**
2. **Register a new user or log in with existing credentials.**
3. **Use the form to create, view, update, or delete products.**
4. **JWT tokens are stored in the browser (e.g., localStorage) and sent with API requests for authentication.**

