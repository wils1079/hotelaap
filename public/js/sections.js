import { tablaUsuarios } from "./tables/tablaUsuarios.js";
import { tablaHabitaciones } from "./tables/tablaHabitaciones.js";
import { tablaReservas } from "./tables/tablaReservas.js";
import { tablaPedidos } from "./tables/tablaPedidos.js";
import { tablaReportes } from "./tables/tablaReportes.js";

import { realizarPeticionGet } from "./api.js";

export const SECTIONS = {
    async overview() {
        return `<h2>📊 Resumen General</h2>`;
    },

    async usuarios() {
        const data = await realizarPeticionGet("/api/usuarios");
        return tablaUsuarios(data);
    },

    async habitaciones() {
        const data = await realizarPeticionGet("/api/habitaciones");
        return tablaHabitaciones(data);
    },

    async reservas() {
        const data = await realizarPeticionGet("/api/reservas");
        return tablaReservas(data);
    },

    async pedidos() {
        const data = await realizarPeticionGet("/api/pedidos");
        return tablaPedidos(data);
    },

    async reportes() {
        const data = await realizarPeticionGet("/api/reportes");
        return tablaReportes(data);
    },


    async checkin() { return `<h2>Check-in</h2>`; },
    async checkout() { return `<h2>Check-out</h2>`; },
    async clientes() { return `<h2>Clientes</h2>`; },
    async menu() { return `<h2>Menú</h2>`; },
    async estadisticas() { return `<h2>Estadísticas</h2>`; },
    async tareas() { return `<h2>Tareas</h2>`; },
    async incidencias() { return `<h2>Incidencias</h2>`; },
    async perfil() { return `<h2>Mi Perfil</h2>`; },
    async valoraciones() { return `<h2>Valoraciones</h2>`; }
};
