# College Event Management System

## Overview
The Event Management System (CampusPulse) enables users to add events, view upcoming events, and register as volunteers or participants. The system is built using **React for the frontend, Django for the backend, and SQLite as the database**.

## Features
- **Add Events:** Users can create events with details like title, description, start and end date.
- **View Events:** Displays a list of upcoming events with registration options.
- **Volunteer Registration:** Users can sign up as volunteers for specific events.
- **Participant Registration:** Users can register as participants for events.
- **Data Storage:** Events, volunteers, and participants are stored in **SQLite**.

## Technologies Used
- **Frontend:** React (JavaScript, JSX, CSS)
- **Backend:** Django (Python, Django REST Framework)
- **Database:** SQLite

## Setup Instructions
### Prerequisites
- Install **Node.js** and **npm**
- Install **Python** and **Django**

### 1. Clone the Repository
```sh
git clone https://github.com/Krupa-1010/Event-Management-System.git
cd event-management
```

### 2. Backend Setup (Django)
```sh
cd ems
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup (React)
```sh
cd frontend
npm install
npm start
```

### 4. Database (SQLite)
Django automatically configures SQLite. The database file `db.sqlite3` is created when running migrations.

## File Structure
```
/event-management
│── backend/              # Django Backend
│   ├── manage.py         # Django Management
│   ├── eventapp/         # Event App
│── frontend/             # React Frontend
│   ├── src/
│   ├── App.js
│   ├── index.js
│── README.md             # Project Documentation
```



