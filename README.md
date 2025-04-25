# CookBook

**Author**: Nadezhda Grishina  
**Course**: TNPW2  
**University**: University of Hradec Králové  
**Last Update**: April 25, 2025

---

## About the Project

**CookBook** is a web application for sharing recipes, created as a semester project for the course TNPW2 at the University of Hradec Králové. Users can register, log in, add their own recipes with images, comment on others' recipes, and browse content by categories.

---

## 🛠 Technologies Used

- Frontend: React, Bootstrap

- Backend: Spring Boot, Java 21, REST API

- Database: MySQL (default)

- Authentication: JWT (JSON Web Token)

---

## 🚀 Running the Project

### Backend

Make sure you have a running MySQL database. You can configure your connection in backend/src/main/resources/application.properties. Example:

    spring.datasource.url=jdbc:mysql://localhost:3306/cookbook
    spring.datasource.username=root
    spring.datasource.password=yourpassword

Then run:

    cd backend
    ./mvnw spring-boot:run

Backend will be available at: `http://localhost:8080`

### Frontend

    cd frontend
    npm install
    npm start

Frontend will be available at: `http://localhost:3000`

---

## 📁 Project Structure

- `backend/` – Spring Boot backend application (API + DB)
- `frontend/` – React frontend (UI)
- `uploads/` – folder for uploaded recipe images

---

## 📸 Preview

![Live Preview](screenshots/preview.png)

