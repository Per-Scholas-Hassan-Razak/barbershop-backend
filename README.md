# Barbershop Backend

Backend service for the **Barbershop Queue Management Application**.  
This app provides APIs for user authentication, barber queue management, haircut customization, and customer interactions.  
It is built with **Node.js, Express, and MongoDB**.

---

## 🚀 Live Deployment

Backend API is hosted on Render:  
👉 [Barbershop Backend API](https://barbershop-backend-hkms.onrender.com/api/v1)

Frontend repo:  
👉 [Barbershop Frontend](https://barbershop-frontend-wq4c.onrender.com/)

---

## 📦 Getting Started

### Clone the repository

```bash
git clone https://github.com/Per-Scholas-Hassan-Razak/barbershop-backend.git
cd barbershop-backend
npm install
```
### Creat a ENV file
PORT=5000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret
NODE_ENV=development

### For Deployed frontend connections use this backend url
VITE_API_URL=https://barbershop-backend-hkms.onrender.com/api/v1


```bash 
# Run locally
npm run dev

# Run in production 
npm run build 
npm run start
```

## 🔑 API Routes Overview

All routes are prefixed with `/api/v1`.

---

### **Auth Routes** (`/users`)

- `POST /users/register` → Register new user (customer or barber).  
- `POST /users/login` → Login existing user, returns JWT token.  

---

### **Barber Routes** (`/barbers`)

> Requires authentication as a **barber**.

- `GET /barbers/haircuts/templates` → Fetch all base haircut templates.  
- `GET /barbers/haircuts` → Fetch all haircuts for the barber.  
- `POST /barbers/haircuts` → Create a new haircut (customized).  
- `PUT /barbers/haircuts/:haircutId` → Update an existing haircut.  
- `DELETE /barbers/haircuts/:haircutId` → Delete a haircut.  

#### Queue Management
- `POST /barbers/queue/open` → Open a new queue for customers.  
- `PATCH /barbers/queue/close` → Close the queue.  
- `GET /barbers/queue/state` → Get current queue state (entries, open/closed).  

---

### **Queue Routes** (`/queues`)

> Requires authentication as **customer** or **barber**.

- `GET /queues/` → List all open queues.  
- `GET /queues/:barberId` → Get details of a specific barber’s queue.  
- `GET /queues/:barberId/haircuts` → List available haircuts for that barber.  
- `POST /queues/:barberId/join` → Join a barber’s queue with selected haircut.  
- `GET /queues/:barberId/my-position` → Get customer’s current queue position + estimated wait time.  


