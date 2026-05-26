# **React Admin Control Panel**

A modern **React admin dashboard** built with **Horizon UI Chakra**, **Chakra UI**, and **React Router**.

The project provides a responsive admin interface with dashboard pages, data tables, profile management, authentication layout, RTL layout support, and a pack management section.

---

# **Project Purpose**

The purpose of this project is to provide an admin dashboard interface for managing application data and business operations.

The dashboard can be used as a foundation for:

- **Admin panels**
- **Business dashboards**
- **Radio advertising management platforms**
- **Pack management systems**
- **User management dashboards**
- **Analytics dashboards**
- **React + Chakra UI portfolio projects**
- **Internal back-office tools**

The project includes reusable layouts, routing, dashboard widgets, charts, tables, profile pages, and authentication screens.

---

# **Technologies Used**

## **Frontend**

- **React 17**
- **React DOM**
- **React Router DOM**
- **Chakra UI**
- **Horizon UI Chakra**
- **Emotion**
- **Framer Motion**
- **React Icons**
- **React Table**
- **React Calendar**
- **React Dropzone**
- **React Custom Scrollbars**
- **ApexCharts**
- **React ApexCharts**

## **Backend / API Dependencies**

- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **CORS**
- **dotenv**
- **OTP Generator**
- **Crypto JS**
- **Vonage Server SDK**

## **Deployment**

- **GitHub Pages**
- **gh-pages**

---

# **Main Features**

## **Admin Dashboard**

The project includes a main dashboard page that can be used to display:

- **Statistics**
- **Charts**
- **Cards**
- **Business KPIs**
- **Recent activity**
- **Dashboard widgets**

---

## **Pack Manager**

The project contains a **Pack Manager** route.

This section can be used to manage commercial packs, advertising packs, subscriptions, offers, or product packages.

---

## **Data Tables**

The dashboard includes data table support using **React Table**.

This can be used for:

- **Users**
- **Orders**
- **Packs**
- **Reservations**
- **Statistics**
- **Business records**

---

## **Profile Page**

The profile page can be used to display and manage administrator or user information.

---

## **Authentication Layout**

The app includes an authentication layout with a sign-in page.

Route:

```text
/auth/sign-in
```

---

## **RTL Layout**

The project supports an RTL admin layout.

This can be useful for Arabic or right-to-left language interfaces.

Route:

```text
/rtl/rtl-default
```

---

## **Charts & Analytics**

The project includes chart libraries:

- **ApexCharts**
- **React ApexCharts**

These can be used to display dashboard analytics and business statistics.

---

# **Application Routes**

| Route | Description |
|---|---|
| **/admin/default** | Main dashboard |
| **/admin/nft-marketplace** | Pack Manager section |
| **/admin/data-tables** | Data tables page |
| **/admin/profile** | Profile page |
| **/auth/sign-in** | Sign-in page |
| **/rtl/rtl-default** | RTL admin dashboard |

Default redirection:

```text
/ → /admin
```

---

# **Project Structure**

```bash
reactpaneladmin/
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── layouts/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── rtl/
│   │
│   ├── theme/
│   ├── variables/
│   ├── views/
│   │   ├── admin/
│   │   │   ├── default/
│   │   │   ├── marketplace/
│   │   │   ├── dataTables/
│   │   │   └── profile/
│   │   │
│   │   └── auth/
│   │       └── signIn/
│   │
│   ├── index.js
│   └── routes.js
│
├── package.json
└── README.md
```

---

# **Installation**

## **1. Clone the Repository**

```bash
git clone https://github.com/Noris69/reactpaneladmin.git
cd reactpaneladmin
```

---

## **2. Install Dependencies**

```bash
npm install
```

---

## **3. Run the Application**

```bash
npm start
```

The application will run on:

```bash
http://localhost:3000
```

---

# **Useful Commands**

## **Start Development Server**

```bash
npm start
```

## **Build for Production**

```bash
npm run build
```

## **Run Tests**

```bash
npm test
```

## **Deploy to GitHub Pages**

```bash
npm run deploy
```

## **Generate Sitemap**

```bash
npm run sitemap
```

---

# **Deployment**

The project includes GitHub Pages deployment scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

To deploy:

```bash
npm run deploy
```

---

# **API / Backend Notes**

The project includes backend-related dependencies such as:

- **Express**
- **Mongoose**
- **JWT**
- **bcrypt**
- **OTP Generator**
- **Vonage SDK**

These dependencies suggest possible support for:

- **Authentication**
- **User management**
- **OTP verification**
- **SMS verification**
- **MongoDB persistence**
- **Protected admin APIs**

A note in the existing README mentions an issue with:

```text
/api/users/stats
```

returning a `404` error.

This means the frontend or admin panel may expect a backend endpoint for user statistics that is currently missing, incorrectly routed, or not deployed.

---

# **Recommended Environment Variables**

Create a `.env` file if backend/API integration is used:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_APP_NAME=React Admin Control Panel
```

For backend services:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
VONAGE_API_KEY=your_vonage_api_key
VONAGE_API_SECRET=your_vonage_api_secret
```

---

# **Security Recommendations**

- **Do not commit .env files**
- **Do not expose JWT secrets**
- **Do not expose Vonage API credentials**
- **Move API URLs to environment variables**
- **Protect admin routes**
- **Add authentication guards**
- **Validate user roles on the backend**
- **Do not store sensitive tokens insecurely**
- **Use HTTPS in production**
- **Handle expired tokens properly**

---

# **Git Ignore Recommendations**

```gitignore
node_modules/
build/
dist/
.env
.env.local
*.log
.DS_Store
.vscode/
.idea/
```


---

# **Author**

Developed by **Noris69**.
