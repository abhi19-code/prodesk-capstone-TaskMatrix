# TaskMatrix

TaskMatrix is an Agile Project Management application designed to help small development teams organize projects, manage tasks, assign work, and track project progress from one place.

## Project Track

**TaskMatrix — Agile Project Management**

## Project Goal

The goal of TaskMatrix is to provide a simple project management platform where teams can create projects, manage tasks, assign tasks to team members, update task status, and monitor overall project progress.

The application will focus on the main features needed by a small development team without adding unnecessary complexity.

## Target Users

### Admin

Admins can:

* Create and manage projects
* Add team members to projects
* Create and manage tasks
* Assign tasks to team members
* View project progress

### Team Member

Team members can:

* View projects they are part of
* View assigned tasks
* Update task status
* Create or update tasks when permitted
* Track their current work

## Technology Stack

### Frontend

* React
* JavaScript
* HTML
* CSS
* Redux Toolkit

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JSON Web Token (JWT)

### Design and Architecture

* Figma for UI/UX wireframes
* Draw.io for system architecture diagrams
* GitHub for source code and version control

## Core Features

### Priority 0 — Minimum Viable Product

These are the main features required for the first working version.

1. User registration and login
2. User authentication
3. Project creation
4. Project management
5. Task creation
6. Task assignment
7. Task priority
8. Task status management
9. Project members
10. Basic project dashboard

### Priority 1 — Important Features

These features will improve the main user experience.

1. Task search
2. Task filtering
3. Project progress tracking
4. Team member management
5. User profile
6. Improved dashboard information

### Priority 2 — Stretch Features

These features can be added if there is enough development time.

1. Task comments
2. Activity history
3. Due date reminders
4. Notifications
5. Additional dashboard statistics

## Task Statuses

Tasks will use the following basic statuses:

* To Do
* In Progress
* Done

## Task Priorities

Tasks will have three priority levels:

* Low
* Medium
* High

## Main Application Screens

The planned application will contain the following main screens:

1. Login
2. Registration
3. Dashboard
4. Projects
5. Project Details
6. Task Details
7. Team Members
8. User Profile

The first UI/UX design phase will focus on at least three core screens as required by the Sprint 13 specification.

## Basic User Flow

```text
User
  |
  v
Login / Register
  |
  v
Dashboard
  |
  +----> Projects
  |        |
  |        v
  |    Project Details
  |        |
  |        +----> Tasks
  |        |
  |        +----> Team Members
  |
  v
User Profile
```

## Development Plan

### Phase 1 — Base MVP

* Project planning
* Product requirements document
* Repository setup
* Basic application structure

### Phase 2 — Priority 1

* UI/UX wireframes
* Authentication screens
* Dashboard design
* Project and task management screens

### Phase 3 — Architecture

* MongoDB data model
* Entity Relationship Diagram
* Frontend state management diagram
* API endpoint planning

### Future Development

After the planning and design phase, the application will be developed in small stages. Each feature will be tested before moving to the next feature.

## Project Status

**Current Status:** Planning and Architecture

Application development has not started yet.

## Repository

This repository contains the planning, design, architecture, and future source code for the TaskMatrix capstone project.
