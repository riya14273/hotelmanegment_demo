# PulseCare Hospital Management System (HMS)

> **Enterprise-Grade Responsive Hospital Portal & Management Dashboard**  
> Built with Semantic HTML5, Modern CSS3 (Grid & Flexbox with Dark Mode), and Object-Oriented Vanilla JavaScript.

---

## 🌟 Key Features

1. **Public Patient Portal**:
   - Modern hero section with emergency trust badges & 30-second OPD quick reservation card.
   - Interactive Centers of Clinical Excellence (Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, Emergency).
   - Dynamic Specialist Directory with department category filters.
   - Patient testimonials carousel, clinical service cards, 24/7 emergency dispatch ribbon, and rich footer.

2. **Advanced Hospital Management Dashboard (HMS)**:
   - Real-time statistics: Active Patients, Consulting Staff, Booked Appointments, and Bed Occupancy.
   - Interactive admissions & OPD flow CSS chart with weekly comparisons.
   - Role authentication modal to preview the dashboard as **Admin**, **Doctor**, or **Patient**.
   - Global search bar with autocomplete navigation across patients, doctors, and appointments.
   - Light and Dark mode toggle with persistent local theme preferences.

3. **Patient Management (Full CRUD)**:
   - Register new patients with age, gender, contact number, blood group, diagnosis, and ward assignments.
   - Edit, update, and delete patient records with custom modal confirmations.
   - Real-time search by name, phone, or Patient ID (`PAT-xxx`), plus gender and blood group filters.
   - One-click CSV export for offline reporting.

4. **Doctor Staff Management**:
   - Add and update consulting doctor profiles with specialty, experience, consultation fee, and on-duty status.
   - Filter by specialty and duty availability (*Available*, *In Surgery*, *On Leave*).

5. **Appointment Scheduling**:
   - Schedule appointments with dynamic doctor dropdowns linked to selected departments.
   - Status updates (*Confirmed*, *Completed*, *Rescheduled*, *Cancelled*).
   - Edit consultation timings and symptoms.

6. **Billing & Printable Invoices**:
   - Itemized bill generator (Doctor Consultation, Laboratory/Diagnostics, Ward & Nursing).
   - Generates official hospital invoice with printable layout (compatible with browser print / Save as PDF).

---

## 📂 Project Structure

```
hospital-management-system/
├── index.html     # Semantic markup for Public Portal & HMS Dashboard
├── style.css      # CSS variables, responsive Grid/Flexbox, Light/Dark themes
├── script.js      # App controller, local persistence, modals, and CRUD logic
└── README.md      # Setup guide and architecture overview
```

---

## 🚀 Beginner Setup Instructions (How to run in VS Code)

### Option 1: Using Live Server (Recommended)
1. Open **Visual Studio Code**.
2. Click **File** > **Open Folder...** and select `hospital-management-system`.
3. If you haven't already, install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl+Shift+X`).
4. Right-click on `index.html` in the file explorer and select **Open with Live Server**.
5. The website will open in your default browser at `http://127.0.0.1:5500`.

### Option 2: Direct Browser Launch
1. Navigate to the project directory in your file manager:
   `C:\Users\Riya Dubey\Downloads\hospital-management-system\`
2. Double-click `index.html` to open it directly in Chrome, Edge, Firefox, or Safari.

---

## 🔒 Security & Deployment Notice
This project is an advanced **frontend demonstration prototype**. All data is stored locally in the browser's `localStorage` for demonstration purposes.

For real hospital deployment:
- Medical records must be managed via a secure backend API (e.g., Node.js / Python FastAPI / Go) connected to an encrypted, HIPAA-compliant database (e.g., PostgreSQL with row-level security).
- Implement strict OAuth2/OIDC role-based access control (RBAC), TLS 1.3 encryption, audit logs, and scheduled data backups.
