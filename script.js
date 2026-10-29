/**
 * PulseCare Hospital Management System (HMS) - Core Logic & Controller
 * Implements Vanilla JavaScript architecture with realistic demo state,
 * full CRUD operations, printable invoices, searching, filtering, and role switching.
 */

// ==========================================================================
// 1. Initial Default Mock Data
// ==========================================================================
const DEFAULT_DOCTORS = [
  {
    id: "DOC-101",
    name: "Dr. Sarah Jenkins",
    degree: "MD, FACC (Harvard)",
    department: "Cardiology",
    experience: 16,
    fee: 140,
    status: "Available",
    schedule: "Mon - Thu (09:00 AM - 02:00 PM)",
    email: "s.jenkins@pulsecarehospital.org",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "DOC-102",
    name: "Dr. Marcus Patel",
    degree: "MS, MCh (Johns Hopkins)",
    department: "Orthopedics",
    experience: 14,
    fee: 120,
    status: "Available",
    schedule: "Mon - Fri (10:00 AM - 04:00 PM)",
    email: "m.patel@pulsecarehospital.org",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "DOC-103",
    name: "Dr. Elena Rostova",
    degree: "MD, DM Neurology (Oxford)",
    department: "Neurology",
    experience: 18,
    fee: 160,
    status: "In Surgery",
    schedule: "Tue, Thu, Sat (08:30 AM - 01:30 PM)",
    email: "e.rostova@pulsecarehospital.org",
    photo: "https://images.unsplash.com/photo-1594824813576-963b655979c5?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "DOC-104",
    name: "Dr. Lisa Wong",
    degree: "MD Pediatrics, FAAP",
    department: "Pediatrics",
    experience: 11,
    fee: 100,
    status: "Available",
    schedule: "Mon - Fri (09:00 AM - 03:00 PM)",
    email: "l.wong@pulsecarehospital.org",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "DOC-105",
    name: "Dr. David Kim",
    degree: "MD, Board Certified Dermatologist",
    department: "Dermatology",
    experience: 9,
    fee: 110,
    status: "On Leave",
    schedule: "Wed - Sat (11:00 AM - 05:00 PM)",
    email: "d.kim@pulsecarehospital.org",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "DOC-106",
    name: "Dr. Robert Sterling",
    degree: "MD, FACEP (Emergency Medicine)",
    department: "Emergency Care",
    experience: 15,
    fee: 150,
    status: "Available",
    schedule: "24/7 Rotational Emergency Duty",
    email: "r.sterling@pulsecarehospital.org",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80"
  }
];

const DEFAULT_PATIENTS = [
  {
    id: "PAT-101",
    name: "Eleanor Vance",
    age: 46,
    gender: "Female",
    phone: "+1 (555) 234-9812",
    blood: "O+",
    diagnosis: "Hypertension & Tachycardia",
    ward: "Cardiology Suite 304",
    notes: "Allergic to Penicillin. Follows low sodium diet.",
    admitDate: "2026-10-18"
  },
  {
    id: "PAT-102",
    name: "James Thornton",
    age: 38,
    gender: "Male",
    phone: "+1 (555) 781-4450",
    blood: "A+",
    diagnosis: "Meniscus Tear Repair",
    ward: "Orthopedic Wing Bed 12",
    notes: "Post-op physical therapy scheduled twice daily.",
    admitDate: "2026-10-20"
  },
  {
    id: "PAT-103",
    name: "Amina Al-Mansoor",
    age: 29,
    gender: "Female",
    phone: "+1 (555) 912-3341",
    blood: "B+",
    diagnosis: "Chronic Migraine Aura",
    ward: "Neurology Day Care",
    notes: "Undergoing brain MRI scan evaluation.",
    admitDate: "2026-10-21"
  },
  {
    id: "PAT-104",
    name: "Lucas Miller",
    age: 7,
    gender: "Male",
    phone: "+1 (555) 670-1123",
    blood: "AB+",
    diagnosis: "Acute Bronchial Asthma",
    ward: "Pediatrics Ward Bed 05",
    notes: "Nebulizer treatment every 6 hours.",
    admitDate: "2026-10-22"
  },
  {
    id: "PAT-105",
    name: "Clara Davenport",
    age: 62,
    gender: "Female",
    phone: "+1 (555) 889-4321",
    blood: "O-",
    diagnosis: "Acute Psoriasis Flare",
    ward: "Outpatient Clinic",
    notes: "Topical steroid therapy prescribed.",
    admitDate: "2026-10-22"
  }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: "APT-8801",
    patientName: "Eleanor Vance",
    phone: "+1 (555) 234-9812",
    doctorName: "Dr. Sarah Jenkins",
    department: "Cardiology",
    date: "2026-10-24",
    time: "10:00 AM - 10:30 AM",
    reason: "Monthly Cardiac Follow-up & ECG Review",
    status: "Confirmed"
  },
  {
    id: "APT-8802",
    patientName: "James Thornton",
    phone: "+1 (555) 781-4450",
    doctorName: "Dr. Marcus Patel",
    department: "Orthopedics",
    date: "2026-10-24",
    time: "11:30 AM - 12:00 PM",
    reason: "Knee Arthroscopy Dressing Check",
    status: "Confirmed"
  },
  {
    id: "APT-8803",
    patientName: "Amina Al-Mansoor",
    phone: "+1 (555) 912-3341",
    doctorName: "Dr. Elena Rostova",
    department: "Neurology",
    date: "2026-10-25",
    time: "09:00 AM - 09:30 AM",
    reason: "Review MRI brain scan findings",
    status: "Rescheduled"
  },
  {
    id: "APT-8804",
    patientName: "Lucas Miller",
    phone: "+1 (555) 670-1123",
    doctorName: "Dr. Lisa Wong",
    department: "Pediatrics",
    date: "2026-10-23",
    time: "02:00 PM - 02:30 PM",
    reason: "Routine Pediatric Booster Vaccination",
    status: "Completed"
  },
  {
    id: "APT-8805",
    patientName: "William Bradley",
    phone: "+1 (555) 345-6789",
    doctorName: "Dr. David Kim",
    department: "Dermatology",
    date: "2026-10-26",
    time: "03:30 PM - 04:00 PM",
    reason: "Skin biopsy evaluation",
    status: "Confirmed"
  }
];

const DEFAULT_INVOICES = [
  {
    id: "INV-8821",
    patientId: "PAT-101",
    patientName: "Eleanor Vance",
    department: "Cardiology",
    date: "2026-10-23",
    consultationFee: 140,
    labCharges: 120,
    roomCharges: 60,
    total: 320,
    status: "Paid"
  },
  {
    id: "INV-8822",
    patientId: "PAT-102",
    patientName: "James Thornton",
    department: "Orthopedics",
    date: "2026-10-22",
    consultationFee: 120,
    labCharges: 250,
    roomCharges: 180,
    total: 550,
    status: "Pending"
  },
  {
    id: "INV-8823",
    patientId: "PAT-104",
    patientName: "Lucas Miller",
    department: "Pediatrics",
    date: "2026-10-23",
    consultationFee: 100,
    labCharges: 45,
    roomCharges: 0,
    total: 145,
    status: "Paid"
  }
];

const DEPARTMENTS_DATA = [
  { name: "Cardiology", head: "Dr. Sarah Jenkins", beds: 45, occupied: 38, icon: "fa-heart-pulse", color: "rose" },
  { name: "Neurology", head: "Dr. Elena Rostova", beds: 35, occupied: 29, icon: "fa-brain", color: "blue" },
  { name: "Orthopedics", head: "Dr. Marcus Patel", beds: 40, occupied: 32, icon: "fa-bone", color: "teal" },
  { name: "Pediatrics", head: "Dr. Lisa Wong", beds: 30, occupied: 22, icon: "fa-baby", color: "amber" },
  { name: "Dermatology", head: "Dr. David Kim", beds: 20, occupied: 12, icon: "fa-hand-dots", color: "purple" },
  { name: "Emergency Care", head: "Dr. Robert Sterling", beds: 25, occupied: 19, icon: "fa-truck-medical", color: "danger" }
];

// ==========================================================================
// 2. Application Core Class
// ==========================================================================
class HospitalApp {
  constructor() {
    this.patients = this.loadData("pulse_patients", DEFAULT_PATIENTS);
    this.doctors = this.loadData("pulse_doctors", DEFAULT_DOCTORS);
    this.appointments = this.loadData("pulse_appointments", DEFAULT_APPOINTMENTS);
    this.invoices = this.loadData("pulse_invoices", DEFAULT_INVOICES);

    this.currentRole = "Admin";
    this.currentUser = "Dr. Alena Vance";
    this.activeTab = "overview";
    this.pendingDelete = null;

    this.init();
  }

  // --- Local Storage Helpers ---
  loadData(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      console.warn("Storage read error:", e);
      return fallback;
    }
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
  }

  // --- Lifecycle Initialization ---
  init() {
    this.setupTheme();
    this.setupEventListeners();
    this.renderPortalDoctors();
    this.renderDashboardOverview();
    this.renderPatientsTable();
    this.renderDoctorsGrid();
    this.renderAppointmentsTable();
    this.renderInvoicesTable();
    this.renderDepartmentsTab();
    this.updateBadges();

    // Set today's date on date inputs
    const todayStr = new Date().toISOString().split("T")[0];
    const quickDate = document.getElementById("quick-date");
    const apptDate = document.getElementById("appt-date");
    if (quickDate) quickDate.min = todayStr;
    if (apptDate) apptDate.min = todayStr;
  }

  // --- Theme Management ---
  setupTheme() {
    const savedTheme = localStorage.getItem("pulse_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);

    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("pulse_theme", next);
        this.updateThemeIcon(next);
        this.showToast(`Switched to ${next} theme`, "info");
      });
    }
  }

  updateThemeIcon(theme) {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    btn.innerHTML = theme === "dark" 
      ? '<i class="fa-solid fa-sun" style="color:#fbbf24;"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }

  // --- Event Listeners Setup ---
  setupEventListeners() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinks = document.getElementById("nav-links");
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
      });
    }

    // Close mobile nav on link click
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks) navLinks.classList.remove("open");
      });
    });

    // Close notification dropdown when clicked outside
    document.addEventListener("click", (e) => {
      const notifBtn = document.getElementById("notif-btn");
      const notifDropdown = document.getElementById("notif-dropdown");
      if (notifDropdown && notifBtn && !notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
        notifDropdown.classList.remove("show");
      }
    });

    // Delete confirmation handler
    const confirmBtn = document.getElementById("confirm-action-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        this.executePendingDelete();
      });
    }
  }

  // --- View Switcher (Portal vs. Dashboard) ---
  showView(viewId) {
    document.querySelectorAll(".view-section").forEach(v => v.classList.remove("active"));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Update main navbar link
    const portalBtn = document.getElementById("portal-dashboard-btn");
    if (portalBtn) {
      portalBtn.innerHTML = viewId === "dashboard-view" 
        ? '<i class="fa-solid fa-globe"></i> <span>View Portal</span>' 
        : '<i class="fa-solid fa-gauge-high"></i> <span>HMS Dashboard</span>';
      portalBtn.onclick = () => {
        if (viewId === "dashboard-view") this.showView("portal-view");
        else this.showDashboard();
      };
    }
  }

  showDashboard() {
    this.showView("dashboard-view");
    this.renderDashboardOverview();
  }

  toggleSidebar() {
    const sidebar = document.getElementById("dashboard-sidebar");
    if (sidebar) sidebar.classList.toggle("open");
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    // Update active tab buttons in sidebar
    document.querySelectorAll(".sidebar-menu .menu-item").forEach(item => {
      item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
    });
    // Show corresponding tab pane
    document.querySelectorAll(".dash-tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-${tabId}`);
    });
    // Close sidebar on mobile after choosing
    const sidebar = document.getElementById("dashboard-sidebar");
    if (sidebar && window.innerWidth <= 768) {
      sidebar.classList.remove("open");
    }
  }

  // --- Badges & Metric Counters ---
  updateBadges() {
    const pCount = document.getElementById("badge-patient-count");
    const dCount = document.getElementById("badge-doctor-count");
    const aCount = document.getElementById("badge-appt-count");

    if (pCount) pCount.innerText = this.patients.length;
    if (dCount) dCount.innerText = this.doctors.length;
    if (aCount) aCount.innerText = this.appointments.filter(a => a.status === "Confirmed").length;
  }

  // ==========================================================================
  // 3. Render Views
  // ==========================================================================

  // --- Render Public Portal Doctors Section ---
  renderPortalDoctors(filterDept = "All") {
    const grid = document.getElementById("portal-doctors-grid");
    if (!grid) return;

    // Filter by department
    const list = filterDept === "All" 
      ? this.doctors 
      : this.doctors.filter(d => d.department.toLowerCase() === filterDept.toLowerCase());

    grid.innerHTML = list.map(doc => `
      <div class="doctor-public-card">
        <div class="doc-img-wrapper">
          <img src="${doc.photo}" alt="${doc.name}" loading="lazy">
          <div class="doc-avail-badge">
            <span class="status-pill status-${doc.status.toLowerCase().replace(/\s+/g, '-')}">
              ${doc.status}
            </span>
          </div>
        </div>
        <div class="doc-card-body">
          <span class="doc-specialty">${doc.department}</span>
          <h3 class="doc-name">${doc.name}</h3>
          <p class="doc-meta">${doc.degree} &bull; ${doc.experience} Yrs Exp</p>
          <div class="doc-timing-box">
            <i class="fa-regular fa-clock"></i> ${doc.schedule}
          </div>
          <div class="doc-card-action">
            <button class="btn btn-outline btn-block" onclick="app.bookWithDoctor('${doc.name}', '${doc.department}')">
              <i class="fa-regular fa-calendar-check"></i> Book Consultation
            </button>
          </div>
        </div>
      </div>
    `).join("");

    // Update active filter pill
    const pills = document.querySelectorAll("#doctor-dept-filters .filter-pill");
    pills.forEach(pill => {
      pill.classList.toggle("active", pill.innerText.includes(filterDept));
    });
  }

  filterPortalDoctors(dept) {
    this.renderPortalDoctors(dept);
  }

  filterDoctorsByDept(dept) {
    const docSec = document.getElementById("doctors");
    if (docSec) docSec.scrollIntoView({ behavior: "smooth" });
    this.filterPortalDoctors(dept);
  }

  // --- Render Dashboard Overview ---
  renderDashboardOverview() {
    const totalP = document.getElementById("stat-total-patients");
    const totalD = document.getElementById("stat-total-doctors");
    const totalA = document.getElementById("stat-total-appointments");
    const totalB = document.getElementById("stat-available-beds");

    if (totalP) totalP.innerText = this.patients.length;
    if (totalD) totalD.innerText = this.doctors.length;
    if (totalA) totalA.innerText = this.appointments.length;
    if (totalB) totalB.innerText = 48;

    // Recent Appointments Table
    const recentTable = document.getElementById("overview-recent-appts-tbody");
    if (recentTable) {
      const recent = this.appointments.slice(0, 5);
      recentTable.innerHTML = recent.map(a => `
        <tr>
          <td><strong>${a.patientName}</strong></td>
          <td>${a.doctorName}</td>
          <td><span class="badge-role">${a.department}</span></td>
          <td>${a.date} <br><small class="text-muted">${a.time}</small></td>
          <td><span class="status-pill status-${a.status.toLowerCase()}">${a.status}</span></td>
        </tr>
      `).join("");
    }

    // Doctors On Call
    const onCallList = document.getElementById("overview-on-call-list");
    if (onCallList) {
      onCallList.innerHTML = this.doctors.slice(0, 4).map(d => `
        <div class="on-call-item">
          <img src="${d.photo}" alt="${d.name}" class="avatar-sm">
          <div class="on-call-info">
            <h5>${d.name}</h5>
            <span>${d.department} &bull; ${d.schedule}</span>
          </div>
          <span class="status-pill status-${d.status.toLowerCase().replace(/\s+/g, '-')} ml-auto">
            ${d.status}
          </span>
        </div>
      `).join("");
    }
  }

  // --- Render Patients Table ---
  renderPatientsTable() {
    const tbody = document.getElementById("patients-table-body");
    const emptyState = document.getElementById("patients-empty-state");
    const searchVal = (document.getElementById("patient-search-input")?.value || "").toLowerCase().trim();
    const genderFilter = document.getElementById("patient-gender-filter")?.value || "All";
    const bloodFilter = document.getElementById("patient-blood-filter")?.value || "All";

    if (!tbody) return;

    let filtered = this.patients.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchVal) ||
                            p.id.toLowerCase().includes(searchVal) ||
                            p.phone.toLowerCase().includes(searchVal);
      const matchesGender = genderFilter === "All" || p.gender === genderFilter;
      const matchesBlood = bloodFilter === "All" || p.blood === bloodFilter;
      return matchesSearch && matchesGender && matchesBlood;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td>
          <div class="font-weight-bold">${p.name}</div>
          <small class="text-muted">Admitted: ${p.admitDate || "Recent"}</small>
        </td>
        <td>${p.age} Yrs / ${p.gender}</td>
        <td>${p.phone}</td>
        <td><span class="badge-role">${p.blood}</span></td>
        <td>${p.diagnosis}</td>
        <td>${p.ward || "OPD"}</td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action" onclick="app.editPatient('${p.id}')" title="Edit Patient Record">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-table-action delete" onclick="app.confirmDelete('patient', '${p.id}', '${p.name}')" title="Delete Patient Record">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    this.updateBadges();
  }

  // --- Render Doctors Grid in Dashboard ---
  renderDoctorsGrid() {
    const grid = document.getElementById("admin-doctors-grid");
    const searchVal = (document.getElementById("doctor-search-input")?.value || "").toLowerCase().trim();
    const deptFilter = document.getElementById("doctor-dept-filter")?.value || "All";
    const statusFilter = document.getElementById("doctor-status-filter")?.value || "All";

    if (!grid) return;

    let filtered = this.doctors.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(searchVal) ||
                            d.department.toLowerCase().includes(searchVal) ||
                            d.email.toLowerCase().includes(searchVal);
      const matchesDept = deptFilter === "All" || d.department === deptFilter;
      const matchesStatus = statusFilter === "All" || d.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });

    grid.innerHTML = filtered.map(doc => `
      <div class="admin-doc-card">
        <div class="admin-doc-header">
          <img src="${doc.photo}" alt="${doc.name}" class="admin-doc-avatar">
          <div class="admin-doc-info">
            <h4>${doc.name}</h4>
            <span>${doc.department}</span>
            <div class="mt-1">
              <span class="status-pill status-${doc.status.toLowerCase().replace(/\s+/g, '-')}">${doc.status}</span>
            </div>
          </div>
        </div>
        <div class="admin-doc-details">
          <div><span>Experience:</span> <strong>${doc.experience} Years</strong></div>
          <div><span>Consultation Fee:</span> <strong>$${doc.fee}</strong></div>
          <div><span>Schedule:</span> <span>${doc.schedule}</span></div>
          <div><span>Email:</span> <span>${doc.email}</span></div>
        </div>
        <div class="admin-doc-actions">
          <button class="btn btn-sm btn-outline" onclick="app.editDoctor('${doc.id}')">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="app.confirmDelete('doctor', '${doc.id}', '${doc.name}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `).join("");

    this.updateBadges();
  }

  // --- Render Appointments Table ---
  renderAppointmentsTable() {
    const tbody = document.getElementById("appointments-table-body");
    const emptyState = document.getElementById("appointments-empty-state");
    const searchVal = (document.getElementById("appt-search-input")?.value || "").toLowerCase().trim();
    const statusFilter = document.getElementById("appt-status-filter")?.value || "All";
    const deptFilter = document.getElementById("appt-dept-filter")?.value || "All";

    if (!tbody) return;

    let filtered = this.appointments.filter(a => {
      const matchesSearch = a.patientName.toLowerCase().includes(searchVal) ||
                            a.doctorName.toLowerCase().includes(searchVal) ||
                            a.id.toLowerCase().includes(searchVal);
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      const matchesDept = deptFilter === "All" || a.department === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    tbody.innerHTML = filtered.map(a => `
      <tr>
        <td><strong>${a.id}</strong></td>
        <td>
          <div class="font-weight-bold">${a.patientName}</div>
          <small class="text-muted"><i class="fa-solid fa-phone"></i> ${a.phone}</small>
        </td>
        <td>${a.doctorName}</td>
        <td><span class="badge-role">${a.department}</span></td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>
          <select class="form-control-sm" onchange="app.changeApptStatus('${a.id}', this.value)" style="width: auto;">
            <option value="Confirmed" ${a.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
            <option value="Completed" ${a.status === "Completed" ? "selected" : ""}>Completed</option>
            <option value="Rescheduled" ${a.status === "Rescheduled" ? "selected" : ""}>Rescheduled</option>
            <option value="Cancelled" ${a.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action" onclick="app.editAppointment('${a.id}')" title="Edit Appointment">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-table-action delete" onclick="app.confirmDelete('appointment', '${a.id}', 'Appointment ${a.id}')" title="Cancel/Delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    this.updateBadges();
  }

  // --- Render Invoices Table ---
  renderInvoicesTable() {
    const tbody = document.getElementById("invoices-table-body");
    if (!tbody) return;

    tbody.innerHTML = this.invoices.map(inv => `
      <tr>
        <td><strong>${inv.id}</strong></td>
        <td>${inv.patientName}</td>
        <td><span class="badge-role">${inv.department}</span></td>
        <td>${inv.date}</td>
        <td><strong>$${inv.total.toFixed(2)}</strong></td>
        <td><span class="status-pill status-${inv.status.toLowerCase().replace(/\s+/g, '-')}">${inv.status}</span></td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action" onclick="app.viewPrintInvoice('${inv.id}')" title="Print/View Invoice">
              <i class="fa-solid fa-print"></i>
            </button>
            <button class="btn-table-action delete" onclick="app.confirmDelete('invoice', '${inv.id}', 'Invoice ${inv.id}')" title="Delete Invoice">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  // --- Render Departments Overview ---
  renderDepartmentsTab() {
    const grid = document.getElementById("admin-dept-overview-grid");
    if (!grid) return;

    grid.innerHTML = DEPARTMENTS_DATA.map(d => {
      const occPercent = Math.round((d.occupied / d.beds) * 100);
      return `
        <div class="admin-dept-card">
          <div class="admin-dept-top">
            <div>
              <h3>${d.name}</h3>
              <small class="text-muted">Head: ${d.head}</small>
            </div>
            <div class="dept-icon-box bg-${d.color}-light text-${d.color}" style="width:44px; height:44px; margin-bottom:0;">
              <i class="fa-solid ${d.icon}"></i>
            </div>
          </div>
          <div class="dept-metric-pills">
            <div class="metric-pill-box">
              <strong>${d.beds}</strong>
              <span>Total Beds</span>
            </div>
            <div class="metric-pill-box">
              <strong>${d.occupied}</strong>
              <span>Occupied</span>
            </div>
          </div>
          <div class="workload-item">
            <div class="workload-header">
              <span>Occupancy Rate</span>
              <strong>${occPercent}%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill bg-${d.color}" style="width: ${occPercent}%;"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // ==========================================================================
  // 4. Modal Management & CRUD Operations
  // ==========================================================================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("show");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("show");
  }

  // --- Patient Management CRUD ---
  openPatientModal(patientId = null) {
    const form = document.getElementById("patient-form");
    if (!form) return;
    form.reset();

    const title = document.getElementById("patient-modal-title");
    const editIdInput = document.getElementById("patient-edit-id");

    if (patientId) {
      const p = this.patients.find(x => x.id === patientId);
      if (p) {
        title.innerHTML = '<i class="fa-solid fa-user-pen text-blue"></i> Edit Patient Record';
        editIdInput.value = p.id;
        document.getElementById("p-name").value = p.name;
        document.getElementById("p-phone").value = p.phone;
        document.getElementById("p-age").value = p.age;
        document.getElementById("p-gender").value = p.gender;
        document.getElementById("p-blood").value = p.blood;
        document.getElementById("p-diagnosis").value = p.diagnosis;
        document.getElementById("p-ward").value = p.ward || "";
        document.getElementById("p-notes").value = p.notes || "";
      }
    } else {
      title.innerHTML = '<i class="fa-solid fa-user-plus text-blue"></i> Register New Patient';
      editIdInput.value = "";
    }
    this.openModal("patient-modal");
  }

  editPatient(id) {
    this.openPatientModal(id);
  }

  handlePatientSubmit(e) {
    e.preventDefault();
    const editId = document.getElementById("patient-edit-id").value;
    const name = document.getElementById("p-name").value.trim();
    const phone = document.getElementById("p-phone").value.trim();
    const age = parseInt(document.getElementById("p-age").value);
    const gender = document.getElementById("p-gender").value;
    const blood = document.getElementById("p-blood").value;
    const diagnosis = document.getElementById("p-diagnosis").value.trim();
    const ward = document.getElementById("p-ward").value.trim();
    const notes = document.getElementById("p-notes").value.trim();

    if (!name || !phone || !age || !diagnosis) {
      this.showToast("Please fill in all required fields", "warning");
      return;
    }

    if (editId) {
      // Update existing
      const idx = this.patients.findIndex(p => p.id === editId);
      if (idx !== -1) {
        this.patients[idx] = {
          ...this.patients[idx],
          name, phone, age, gender, blood, diagnosis, ward, notes
        };
        this.showToast(`Patient record for ${name} updated successfully`, "success");
      }
    } else {
      // Create new
      const newId = `PAT-${Math.floor(100 + Math.random() * 900)}`;
      const newPatient = {
        id: newId,
        name, phone, age, gender, blood, diagnosis, ward, notes,
        admitDate: new Date().toISOString().split("T")[0]
      };
      this.patients.unshift(newPatient);
      this.showToast(`Patient ${name} registered with ID ${newId}`, "success");
    }

    this.saveData("pulse_patients", this.patients);
    this.renderPatientsTable();
    this.renderDashboardOverview();
    this.closeModal("patient-modal");
  }

  // --- Doctor Management CRUD ---
  openDoctorModal(doctorId = null) {
    const form = document.getElementById("doctor-form");
    if (!form) return;
    form.reset();

    const title = document.getElementById("doctor-modal-title");
    const editIdInput = document.getElementById("doctor-edit-id");

    if (doctorId) {
      const d = this.doctors.find(x => x.id === doctorId);
      if (d) {
        title.innerHTML = '<i class="fa-solid fa-user-pen text-teal"></i> Edit Doctor Profile';
        editIdInput.value = d.id;
        document.getElementById("doc-name").value = d.name;
        document.getElementById("doc-dept").value = d.department;
        document.getElementById("doc-exp").value = d.experience;
        document.getElementById("doc-fee").value = d.fee;
        document.getElementById("doc-status").value = d.status;
        document.getElementById("doc-schedule").value = d.schedule;
        document.getElementById("doc-email").value = d.email;
        document.getElementById("doc-photo").value = d.photo;
      }
    } else {
      title.innerHTML = '<i class="fa-solid fa-user-doctor text-teal"></i> Add Doctor Profile';
      editIdInput.value = "";
    }
    this.openModal("doctor-modal");
  }

  editDoctor(id) {
    this.openDoctorModal(id);
  }

  handleDoctorSubmit(e) {
    e.preventDefault();
    const editId = document.getElementById("doctor-edit-id").value;
    const name = document.getElementById("doc-name").value.trim();
    const department = document.getElementById("doc-dept").value;
    const experience = parseInt(document.getElementById("doc-exp").value);
    const fee = parseFloat(document.getElementById("doc-fee").value);
    const status = document.getElementById("doc-status").value;
    const schedule = document.getElementById("doc-schedule").value.trim();
    const email = document.getElementById("doc-email").value.trim();
    let photo = document.getElementById("doc-photo").value.trim();

    if (!photo) {
      photo = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80";
    }

    if (editId) {
      const idx = this.doctors.findIndex(d => d.id === editId);
      if (idx !== -1) {
        this.doctors[idx] = {
          ...this.doctors[idx],
          name, department, experience, fee, status, schedule, email, photo
        };
        this.showToast(`Doctor profile ${name} updated`, "success");
      }
    } else {
      const newId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
      this.doctors.push({
        id: newId,
        name,
        degree: "MD, Specialist",
        department,
        experience,
        fee,
        status,
        schedule,
        email,
        photo
      });
      this.showToast(`New specialist ${name} added successfully`, "success");
    }

    this.saveData("pulse_doctors", this.doctors);
    this.renderDoctorsGrid();
    this.renderPortalDoctors();
    this.renderDashboardOverview();
    this.closeModal("doctor-modal");
  }

  // --- Appointment Booking & CRUD ---
  openAppointmentModal(prefilledDept = null, prefilledDoc = null) {
    const form = document.getElementById("appointment-form");
    if (!form) return;
    form.reset();

    document.getElementById("appt-edit-id").value = "";
    document.getElementById("appt-modal-title").innerHTML = '<i class="fa-solid fa-calendar-check text-blue"></i> Schedule Doctor Appointment';

    if (prefilledDept) {
      document.getElementById("appt-dept").value = prefilledDept;
    }
    this.updateApptDoctorOptions(prefilledDoc);
    this.openModal("appointment-modal");
  }

  updateApptDoctorOptions(selectedDocName = null) {
    const dept = document.getElementById("appt-dept").value;
    const docSelect = document.getElementById("appt-doctor");
    if (!docSelect) return;

    if (!dept) {
      docSelect.innerHTML = '<option value="">Select Department First</option>';
      return;
    }

    const matching = this.doctors.filter(d => d.department.toLowerCase() === dept.toLowerCase());
    if (matching.length === 0) {
      docSelect.innerHTML = '<option value="">No doctors available in this specialty</option>';
      return;
    }

    docSelect.innerHTML = matching.map(d => `
      <option value="${d.name}" ${selectedDocName === d.name ? "selected" : ""}>
        ${d.name} (${d.status} - $${d.fee})
      </option>
    `).join("");
  }

  bookWithDoctor(docName, dept) {
    this.openAppointmentModal(dept, docName);
  }

  handleAppointmentSubmit(e) {
    e.preventDefault();
    const editId = document.getElementById("appt-edit-id").value;
    const patientName = document.getElementById("appt-patient").value.trim();
    const phone = document.getElementById("appt-phone").value.trim();
    const department = document.getElementById("appt-dept").value;
    const doctorName = document.getElementById("appt-doctor").value;
    const date = document.getElementById("appt-date").value;
    const time = document.getElementById("appt-time").value;
    const reason = document.getElementById("appt-reason").value.trim();

    if (!patientName || !phone || !department || !doctorName || !date || !time) {
      this.showToast("Please fill in all appointment fields", "warning");
      return;
    }

    if (editId) {
      const idx = this.appointments.findIndex(a => a.id === editId);
      if (idx !== -1) {
        this.appointments[idx] = {
          ...this.appointments[idx],
          patientName, phone, department, doctorName, date, time, reason
        };
        this.showToast(`Appointment ${editId} updated successfully`, "success");
      }
    } else {
      const newId = `APT-${Math.floor(8000 + Math.random() * 1000)}`;
      this.appointments.unshift({
        id: newId,
        patientName,
        phone,
        department,
        doctorName,
        date,
        time,
        reason,
        status: "Confirmed"
      });
      this.showToast(`Appointment confirmed for ${patientName} on ${date}!`, "success");
    }

    this.saveData("pulse_appointments", this.appointments);
    this.renderAppointmentsTable();
    this.renderDashboardOverview();
    this.closeModal("appointment-modal");
  }

  editAppointment(id) {
    const a = this.appointments.find(x => x.id === id);
    if (!a) return;

    document.getElementById("appt-edit-id").value = a.id;
    document.getElementById("appt-modal-title").innerHTML = '<i class="fa-solid fa-calendar-pen text-blue"></i> Reschedule / Edit Appointment';
    document.getElementById("appt-patient").value = a.patientName;
    document.getElementById("appt-phone").value = a.phone;
    document.getElementById("appt-dept").value = a.department;
    this.updateApptDoctorOptions(a.doctorName);
    document.getElementById("appt-date").value = a.date;
    document.getElementById("appt-time").value = a.time;
    document.getElementById("appt-reason").value = a.reason || "";

    this.openModal("appointment-modal");
  }

  changeApptStatus(id, newStatus) {
    const a = this.appointments.find(x => x.id === id);
    if (a) {
      a.status = newStatus;
      this.saveData("pulse_appointments", this.appointments);
      this.renderDashboardOverview();
      this.showToast(`Appointment ${id} status set to "${newStatus}"`, "info");
    }
  }

  handleQuickAppointment(e) {
    e.preventDefault();
    const name = document.getElementById("quick-name").value.trim();
    const phone = document.getElementById("quick-phone").value.trim();
    const dept = document.getElementById("quick-dept").value;
    const date = document.getElementById("quick-date").value;

    if (!name || !phone || !dept || !date) {
      this.showToast("Please complete the quick reservation form", "warning");
      return;
    }

    // Auto-assign first available doctor in this department
    const doc = this.doctors.find(d => d.department.toLowerCase() === dept.toLowerCase()) || this.doctors[0];
    const newId = `APT-${Math.floor(8000 + Math.random() * 1000)}`;

    this.appointments.unshift({
      id: newId,
      patientName: name,
      phone,
      department: dept,
      doctorName: doc.name,
      date,
      time: "09:30 AM - 10:00 AM",
      reason: "Quick OPD Online Booking",
      status: "Confirmed"
    });

    this.saveData("pulse_appointments", this.appointments);
    this.renderAppointmentsTable();
    this.renderDashboardOverview();
    e.target.reset();
    this.showToast(`Appointment reserved with ${doc.name} on ${date}! Booking ID: ${newId}`, "success");
  }

  // --- Billing & Invoicing CRUD ---
  openBillingModal() {
    const select = document.getElementById("bill-patient-select");
    if (select) {
      select.innerHTML = this.patients.map(p => `
        <option value="${p.id}" data-name="${p.name}">${p.name} (${p.id})</option>
      `).join("");
    }
    this.calculateBillTotal();
    this.openModal("billing-modal");
  }

  calculateBillTotal() {
    const fee = parseFloat(document.getElementById("bill-fee")?.value) || 0;
    const labs = parseFloat(document.getElementById("bill-labs")?.value) || 0;
    const room = parseFloat(document.getElementById("bill-room")?.value) || 0;
    const total = fee + labs + room;
    const display = document.getElementById("bill-total-display");
    if (display) display.value = `$${total.toFixed(2)}`;
    return total;
  }

  handleBillingSubmit(e) {
    e.preventDefault();
    const patientSelect = document.getElementById("bill-patient-select");
    const patientId = patientSelect.value;
    const patientName = patientSelect.options[patientSelect.selectedIndex].getAttribute("data-name");
    const department = document.getElementById("bill-dept").value;
    const fee = parseFloat(document.getElementById("bill-fee").value) || 0;
    const labs = parseFloat(document.getElementById("bill-labs").value) || 0;
    const room = parseFloat(document.getElementById("bill-room").value) || 0;
    const status = document.getElementById("bill-status").value;
    const total = fee + labs + room;

    const newId = `INV-${Math.floor(8800 + Math.random() * 1000)}`;
    const newInvoice = {
      id: newId,
      patientId,
      patientName,
      department,
      date: new Date().toISOString().split("T")[0],
      consultationFee: fee,
      labCharges: labs,
      roomCharges: room,
      total,
      status
    };

    this.invoices.unshift(newInvoice);
    this.saveData("pulse_invoices", this.invoices);
    this.renderInvoicesTable();
    this.closeModal("billing-modal");
    this.showToast(`Invoice ${newId} generated for ${patientName}`, "success");
    // Directly view print preview
    this.viewPrintInvoice(newId);
  }

  viewPrintInvoice(invId) {
    const inv = this.invoices.find(x => x.id === invId);
    if (!inv) return;

    const patient = this.patients.find(p => p.id === inv.patientId) || {
      name: inv.patientName,
      phone: "+1 (555) 000-0000",
      blood: "N/A"
    };

    const container = document.getElementById("printable-invoice-content");
    if (!container) return;

    container.innerHTML = `
      <div class="invoice-paper">
        <div class="invoice-header-row">
          <div class="invoice-brand">
            <h2>PulseCare Hospital</h2>
            <p>742 Evergreen Healthcare Ave, Metro City</p>
            <p>Phone: +1 (800) 437-CARE | Web: pulsecarehospital.org</p>
          </div>
          <div class="invoice-meta">
            <h3>PATIENT INVOICE</h3>
            <span><strong>Invoice No:</strong> ${inv.id}</span>
            <span><strong>Date Issued:</strong> ${inv.date}</span>
            <span><strong>Status:</strong> ${inv.status.toUpperCase()}</span>
          </div>
        </div>

        <div class="invoice-parties-row">
          <div class="party-box">
            <strong>Billed To (Patient):</strong>
            <p>
              ${inv.patientName}<br>
              Patient ID: ${inv.patientId}<br>
              Phone: ${patient.phone}<br>
              Blood Group: ${patient.blood}
            </p>
          </div>
          <div class="party-box">
            <strong>Department & Care Unit:</strong>
            <p>
              Department: ${inv.department}<br>
              Facility: PulseCare Multi-Specialty Hospital<br>
              Cashless Insurance Pre-Auth: Eligible
            </p>
          </div>
        </div>

        <table class="invoice-items-table">
          <thead>
            <tr>
              <th>Service Item Description</th>
              <th>Department</th>
              <th style="text-align: right;">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Physician Consultation & Clinical Assessment</td>
              <td>${inv.department}</td>
              <td style="text-align: right;">$${inv.consultationFee.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Pathology Lab / Diagnostic Biochemistry Tests</td>
              <td>Diagnostics & Lab</td>
              <td style="text-align: right;">$${inv.labCharges.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Facility, Ward Nursing & Pharmacy Disposables</td>
              <td>Inpatient Support</td>
              <td style="text-align: right;">$${inv.roomCharges.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div class="invoice-summary-row">
          <div class="invoice-totals">
            <div class="invoice-totals-line">
              <span>Subtotal:</span>
              <span>$${inv.total.toFixed(2)}</span>
            </div>
            <div class="invoice-totals-line">
              <span>Tax / Surcharge (0% Medical):</span>
              <span>$0.00</span>
            </div>
            <div class="invoice-totals-line grand-total">
              <span>Total Payable:</span>
              <span>$${inv.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div class="invoice-footer-notes">
          <p>Thank you for placing your trust in PulseCare Hospital. This computer-generated invoice is valid without signature.</p>
          <p>For billing inquiries, contact billing@pulsecarehospital.org or call ext: 1042.</p>
        </div>
      </div>
    `;

    this.openModal("invoice-view-modal");
  }

  // --- Deletion Flow with Confirmation Modal ---
  confirmDelete(type, id, displayName) {
    this.pendingDelete = { type, id };
    const title = document.getElementById("confirm-modal-title");
    const msg = document.getElementById("confirm-modal-msg");

    if (title) title.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-danger"></i> Delete ${type.toUpperCase()}`;
    if (msg) msg.innerText = `Are you sure you want to permanently delete "${displayName}"? This action cannot be undone.`;

    this.openModal("confirm-modal");
  }

  executePendingDelete() {
    if (!this.pendingDelete) return;
    const { type, id } = this.pendingDelete;

    if (type === "patient") {
      this.patients = this.patients.filter(p => p.id !== id);
      this.saveData("pulse_patients", this.patients);
      this.renderPatientsTable();
      this.showToast(`Patient record ${id} removed`, "danger");
    } else if (type === "doctor") {
      this.doctors = this.doctors.filter(d => d.id !== id);
      this.saveData("pulse_doctors", this.doctors);
      this.renderDoctorsGrid();
      this.renderPortalDoctors();
      this.showToast(`Doctor ${id} profile deleted`, "danger");
    } else if (type === "appointment") {
      this.appointments = this.appointments.filter(a => a.id !== id);
      this.saveData("pulse_appointments", this.appointments);
      this.renderAppointmentsTable();
      this.showToast(`Appointment ${id} removed`, "danger");
    } else if (type === "invoice") {
      this.invoices = this.invoices.filter(i => i.id !== id);
      this.saveData("pulse_invoices", this.invoices);
      this.renderInvoicesTable();
      this.showToast(`Invoice ${id} deleted`, "danger");
    }

    this.renderDashboardOverview();
    this.pendingDelete = null;
    this.closeModal("confirm-modal");
  }

  // --- Role Switcher & Persona Authentication ---
  openAuthModal() {
    this.openModal("auth-modal");
  }

  selectRole(roleName, userName, cardElement) {
    this.tempRole = roleName;
    this.tempUser = userName;
    document.querySelectorAll(".role-card").forEach(c => c.classList.remove("active"));
    cardElement.classList.add("active");

    const emailInput = document.getElementById("auth-identifier");
    if (emailInput) {
      if (roleName === "Admin") emailInput.value = "admin@pulsecarehospital.org";
      else if (roleName === "Doctor") emailInput.value = "s.jenkins@pulsecarehospital.org";
      else emailInput.value = "eleanor.vance@gmail.com";
    }
  }

  confirmRoleSwitch() {
    this.currentRole = this.tempRole || this.currentRole;
    this.currentUser = this.tempUser || this.currentUser;

    const roleElem = document.getElementById("current-user-role");
    const nameElem = document.getElementById("current-user-name");
    const welcomeElem = document.getElementById("welcome-user-name");

    if (roleElem) roleElem.innerText = this.currentRole;
    if (nameElem) nameElem.innerText = this.currentUser;
    if (welcomeElem) welcomeElem.innerText = this.currentUser;

    this.closeModal("auth-modal");
    this.showToast(`Switched active persona to ${this.currentUser} (${this.currentRole})`, "success");
  }

  // --- Global Top Search Bar ---
  handleGlobalSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) return;

    // Switch to Patients tab if query matches a patient or PAT
    if (q.startsWith("pat") || this.patients.some(p => p.name.toLowerCase().includes(q))) {
      this.switchTab("patients");
      const searchBox = document.getElementById("patient-search-input");
      if (searchBox) {
        searchBox.value = q;
        this.renderPatientsTable();
      }
    } else if (q.startsWith("doc") || this.doctors.some(d => d.name.toLowerCase().includes(q))) {
      this.switchTab("doctors");
      const searchBox = document.getElementById("doctor-search-input");
      if (searchBox) {
        searchBox.value = q;
        this.renderDoctorsGrid();
      }
    } else if (q.startsWith("apt") || this.appointments.some(a => a.id.toLowerCase().includes(q))) {
      this.switchTab("appointments");
      const searchBox = document.getElementById("appt-search-input");
      if (searchBox) {
        searchBox.value = q;
        this.renderAppointmentsTable();
      }
    }
  }

  // --- Notification Center ---
  toggleNotifDropdown() {
    const d = document.getElementById("notif-dropdown");
    if (d) d.classList.toggle("show");
  }

  clearNotifications() {
    const list = document.getElementById("notif-list");
    if (list) {
      list.innerHTML = '<li class="text-muted p-2 text-center">No active notifications</li>';
    }
    const dot = document.querySelector(".notif-dot");
    if (dot) dot.style.display = "none";
    this.showToast("Notifications cleared", "info");
  }

  // --- Export Patients to CSV ---
  exportPatientsCSV() {
    if (this.patients.length === 0) {
      this.showToast("No patient records to export", "warning");
      return;
    }
    const headers = ["Patient ID", "Name", "Age", "Gender", "Phone", "Blood Group", "Diagnosis", "Ward", "Admit Date"];
    const rows = this.patients.map(p => [
      `"${p.id}"`,
      `"${p.name}"`,
      p.age,
      `"${p.gender}"`,
      `"${p.phone}"`,
      `"${p.blood}"`,
      `"${p.diagnosis}"`,
      `"${p.ward || ''}"`,
      `"${p.admitDate || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pulsecare_patients_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("Patient records exported to CSV", "success");
  }

  // --- Reset Demo Data ---
  resetDemoData() {
    localStorage.removeItem("pulse_patients");
    localStorage.removeItem("pulse_doctors");
    localStorage.removeItem("pulse_appointments");
    localStorage.removeItem("pulse_invoices");

    this.patients = JSON.parse(JSON.stringify(DEFAULT_PATIENTS));
    this.doctors = JSON.parse(JSON.stringify(DEFAULT_DOCTORS));
    this.appointments = JSON.parse(JSON.stringify(DEFAULT_APPOINTMENTS));
    this.invoices = JSON.parse(JSON.stringify(DEFAULT_INVOICES));

    this.renderDashboardOverview();
    this.renderPatientsTable();
    this.renderDoctorsGrid();
    this.renderAppointmentsTable();
    this.renderInvoicesTable();
    this.renderPortalDoctors();
    this.updateBadges();

    this.showToast("Demo storage restored to factory initial state", "success");
  }

  // --- Toast Notifications System ---
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const iconMap = {
      success: "fa-circle-check",
      danger: "fa-circle-xmark",
      warning: "fa-triangle-exclamation",
      info: "fa-bell"
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon"><i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i></div>
      <div class="toast-content">
        <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Global Application Instance
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new HospitalApp();
});
