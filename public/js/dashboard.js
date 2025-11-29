import { MENUS } from "./menus.js";
import { SECTIONS } from "./sections.js";


export class Dashboard {

    constructor() {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.token = localStorage.getItem("token");

        if (!this.usuario || !this.token) {
            window.location.href = "index.html";
            return;
        }

        this.init();
    }

    init() {
        this.renderUserInfo();
        this.renderNavigation();
        this.setupMenuClicks();
        this.setupEventListeners();

        // Cargar primera sección automáticamente
        const firstSection = MENUS[this.usuario.rol.toLowerCase()][0].id;
        this.loadSection(firstSection);
    }

    renderUserInfo() {
        document.getElementById("userName").textContent = this.usuario.nombre;
        document.getElementById("userRole").textContent = this.usuario.rol;
    }

    renderNavigation() {
        const role = this.usuario.rol.toLowerCase();
        const nav = MENUS[role];

        document.getElementById("sidebarNav").innerHTML = nav.map(i => `
            <a class="nav-item" data-section="${i.id}">
                ${i.label}
            </a>
        `).join("");
    }

    setupMenuClicks() {
        document.querySelectorAll(".nav-item").forEach(item => {
            item.addEventListener("click", () => {
                document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
                item.classList.add("active");

                this.loadSection(item.dataset.section);
            });
        });
    }

    setupEventListeners() { 
        document.getElementById('logoutBtn').addEventListener('click', () => 
            { localStorage.clear(); window.location.href = 'index.html'; }); }

    async loadSection(section) {
        const loader = SECTIONS[section];

        document.getElementById("dashboardContent").innerHTML = loader
            ? await loader()
            : `<h2>❌ Sección no encontrada (${section})</h2>`;
    }
}

new Dashboard();


// post de un nuev suario

console.log("registro.js cargado correctamente");

document.getElementById('formRegistro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;

    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('/api/auth/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email, password, rol }),
        });

        console.log("Status respuesta:", response.status);
        console.log("OK?:", response.ok);

        const data = await response.json();
        console.log("Respuesta completa:", data);

        if (response.ok) {
            alert("Usuario registrado correctamente");
            window.location.reload();
        } else {
            messageDiv.textContent = data.message || 'Error al crear el usuario';
            messageDiv.className = 'message error';
        }

    } catch (error) {
        console.error("Error:", error);
        messageDiv.textContent = 'Error de conexión';
        messageDiv.className = 'message error';
    }
});

