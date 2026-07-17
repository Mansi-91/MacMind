> **Desktop File Intelligence & Analytics Dashboard**

MacMind is a desktop analytics application that scans folders on your Mac, indexes file metadata into a SQLite database, and provides interactive dashboards to analyze storage usage, file distribution, and system insights.

Built as a Technical Analyst portfolio project to demonstrate data collection, processing, visualization, and dashboard development.



##  Features

###  Folder Scanner
- Scan any folder on your Mac
- Recursive file indexing
- Prevents duplicate entries
- Stores metadata in SQLite

###  Analytics Dashboard
- Total Indexed Files
- Total Storage Usage
- PDF Count
- Image Count
- Top File Types
- Storage Consumption by Extension
- Largest Files
- Recently Modified Files

###  File Explorer
- Browse indexed files
- Filter by:
  - Extension
  - Minimum Size
  - Maximum Size
- View file metadata

###  Data Insights
- Storage distribution
- File type analysis
- Largest file detection
- Recently modified files
- Duplicate file detection



#  Architecture

```
Mac Folder
      │
      ▼
Folder Scanner (Node.js)
      │
      ▼
SQLite Database
      │
      ▼
Express REST API
      │
      ▼
React Dashboard
```



#  Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- better-sqlite3

### Database
- SQLite



#  Project Structure

```
MacMind
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── services
│   ├── database
│   └── app.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
└── README.md
```



#  Installation

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/MacMind.git

cd MacMind
```

---

## Backend

```bash
cd backend

npm install

npm start
```

Backend runs on:

```
http://localhost:8080
```



## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```



#  Dashboard Overview

The dashboard provides:

- Total Indexed Files
- Total Storage Used
- PDF Statistics
- Image Statistics
- File Type Distribution
- Storage Usage by Extension
- Largest Files
- Recently Modified Files



#  API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/scan?path=` | Scan a folder |
| GET | `/dashboard/stats` | Dashboard KPIs |
| GET | `/dashboard/file-types` | File type distribution |
| GET | `/dashboard/storage` | Storage analytics |
| GET | `/dashboard/largest` | Largest files |
| GET | `/dashboard/recent` | Recently modified files |
| GET | `/files` | List all indexed files |
| GET | `/files/filter` | Filter files |
| GET | `/files/search` | Search indexed files |
| GET | `/files/duplicates` | Duplicate files |



#  Key Learning Outcomes

- Recursive file system traversal
- Metadata extraction
- SQLite database design
- REST API development
- Data aggregation using SQL
- Dashboard development
- Data visualization with Recharts
- Responsive UI using Tailwind CSS



#  Future Improvements

- AI-powered natural language file search
- Semantic search using embeddings
- Duplicate removal suggestions
- File categorization
- Folder health score
- Trend analysis
- Export reports (CSV/PDF)
- Scheduled background indexing
- Cross-platform support (Windows/Linux)



#  Screenshots


<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/34536d2c-36ee-4930-8416-338b3d685327" />

<img width="1466" height="919" alt="image" src="https://github.com/user-attachments/assets/17b4f136-0d95-4e12-86ff-f9059b1f7b00" />

<img width="1461" height="917" alt="image" src="https://github.com/user-attachments/assets/2f3be244-b290-4d5a-ad4f-46e19d836745" />



#  Use Cases

- Personal storage analysis
- File organization
- Disk usage insights
- Technical Analyst portfolio
- Data visualization demonstration



#  Author

**Mansi Kapse**

B.Tech Computer Science Engineering

Technical Analyst | Full Stack Developer | Data Analytics Enthusiast

GitHub: https://github.com/Mansi-91

---
