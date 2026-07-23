# 🌍 Disaster Relief Resource Management System

A full-stack web-based Disaster Relief Resource Management System designed to efficiently coordinate disaster relief resources, donations, requests, NGOs, victims, and resource distribution.

The system provides role-based access for administrators, NGOs, and donors, enabling efficient management and tracking of disaster relief operations through a centralized platform.


## 📌 Project Overview

During natural disasters and emergency situations, the effective management and distribution of essential resources such as food, water, medicines, blankets, and shelter kits is critical.

This project aims to provide a centralized digital platform that connects:

- 👤 Donors
- 🏢 NGOs
- 🛡️ Administrators
- 🆘 Disaster Victims
- 📦 Relief Resources

The system allows users to contribute resources, submit resource requests, manage donations, track resource allocation, and monitor the delivery process.


## ✨ Key Features

### 🔐 Authentication & Authorization

- User registration and login
- Role-based access control
- Separate dashboards for different user roles
- Admin login
- NGO login
- Donor login

### 👤 Donor Features

- Add disaster relief donations
- Specify resource type and quantity
- Provide donation location
- View personal donation history
- Track donation status
- Monitor whether donations are available, assigned, or delivered
- View donation impact and delivery information

### 🏢 NGO Features

- View available relief resources
- Submit resource requests
- Manage resource requirements
- Track assigned resources
- Monitor delivery status

### 🛡️ Admin Features

- Monitor the overall relief operation
- Manage users
- View donations
- Monitor resource requests
- Manage donation-request matching
- Update delivery status
- Track overall system activity

### 📦 Resource Management

The system supports different types of relief resources, including:

- Food Kits
- Water Bottles
- Medicines
- Blankets
- Clothes
- Shelter Kits

### 🔄 Donation Tracking

Donation lifecycle tracking:

```text
Available
    ↓
Assigned
    ↓
Delivered