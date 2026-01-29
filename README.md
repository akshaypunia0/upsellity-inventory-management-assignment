# Upsellit Inventory Management System

A comprehensive web-based inventory management system built with React, Express.js, and PostgreSQL. This application enables businesses to efficiently manage product inventory, track stock levels, and analyze inventory metrics.

## 🎯 Features

- **Product Management**: Create, read, update, and delete products with detailed information
- **Stock Tracking**: Monitor inventory levels with real-time stock status (In Stock, Low Stock, Out of Stock)
- **Advanced Search**: Search products by name or SKU
- **Filtering & Sorting**: Filter products by stock status and sort by price
- **Analytics Dashboard**: View comprehensive inventory analytics including:
  - Total products count
  - Total inventory value
  - Out of stock product details
  - Low stock product alerts
- **Responsive UI**: Modern, mobile-friendly interface built with React and Tailwind CSS
- **RESTful API**: Complete REST API for all inventory operations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/upsellit-inventory-management-assignment.git
cd upsellit-inventory-management-assignment
```

### 2. Environment Setup

Create a `.env` file in the server directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/upsellit_inventory"

# Server Configuration
PORT=5000
NODE_ENV=development
```

Create a `.env.local` file in the client directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Set up the database:

```bash
# Create migration
npx prisma migrate dev --name product_table

# Run migrations (if already created)
npx prisma migrate deploy
```

Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 4. Client Setup

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The client will typically run on `http://localhost:5173`

## 📦 Project Structure

```
upsellit-inventory-management-assignment/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── api/                    # API integration layer
│   │   │   ├── productApi.js       # Product API calls
│   │   │   └── analyticsApi.js     # Analytics API calls
│   │   ├── component/              # Reusable components
│   │   │   ├── products/           # Product-related components
│   │   │   ├── analytics/          # Analytics components
│   │   │   ├── layout/             # Layout components
│   │   │   └── common/             # Common utility components
│   │   ├── components/             # UI components (shadcn/ui)
│   │   ├── pages/                  # Page components
│   │   │   ├── Products.jsx        # Products page
│   │   │   ├── Analytics.jsx       # Analytics page
│   │   │   └── ProductDetails.jsx  # Product details page
│   │   ├── routes/                 # Routing configuration
│   │   ├── lib/                    # Utility functions
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                          # Express backend application
│   ├── src/
│   │   ├── app.js                  # Express app configuration
│   │   ├── server.js               # Server entry point
│   │   ├── config/
│   │   │   └── db.js               # Database configuration
│   │   ├── controllers/            # Business logic
│   │   │   ├── productControllers.js
│   │   │   └── analyticsController.js
│   │   └── routes/                 # API routes
│   │       ├── productRoutes.js
│   │       └── analyticsRoutes.js
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema
│   │   └── migrations/             # Database migrations
│   ├── package.json
│   └── server.js
└── README.md
```

## 🔌 API Endpoints

### Products

- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PATCH /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Analytics

- `GET /api/analytics` - Get inventory analytics

For detailed API documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **React Router** 7.13.0 - Client-side routing
- **Axios** 1.13.4 - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.2.1 - Web framework
- **Prisma** 7.3.0 - ORM and query builder
- **PostgreSQL** - Relational database
- **CORS** - Cross-origin resource sharing

## 🎨 UI Components

The project uses Shadcn UI components with Radix UI primitives:
- Alert Dialog
- Dialog
- Dropdown Menu
- Input
- Button
- Badge
- Card
- Table
- Separator
- Label

## 💾 Database Schema

### Product Model

```prisma
model Product {
  id        String   @id @default(uuid())
  name      String
  sku       String   @unique
  price     Float
  stock     Int
  minStock  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}
```

## 📝 Scripts

### Server Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Error Handling

The application includes comprehensive error handling:
- Server-side validation for all inputs
- HTTP status codes for different error scenarios
- User-friendly error messages in the UI
- Proper exception handling in API calls

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🚢 Deployment

### Vercel Configuration
The project includes `vercel.json` for easy deployment to Vercel.

For client deployment:
1. Push your code to GitHub
2. Connect to Vercel dashboard
3. Configure environment variables
4. Deploy

### Server Deployment
Deploy the server to your preferred hosting (Heroku, Railway, AWS, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📧 Support

For support, please open an issue on the GitHub repository or contact the development team.

---

**Happy Inventory Management! 📦**
