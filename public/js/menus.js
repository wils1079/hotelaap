export const MENUS = {
    admin: [
        { id: "overview", label: "📊 Resumen General" },
        { id: "usuarios", label: "👥 Usuarios" },
        { id: "habitaciones", label: "🏠 Habitaciones" },
        { id: "reservas", label: "📅 Reservas" },
        { id: "pedidos", label: "🍽️ Pedidos" },
        { id: "reportes", label: "📈 Reportes" }
    ],

    recepcionista: [
        { id: "reservas", label: "📅 Reservas" },
        { id: "checkin", label: "✅ Check-in" },
        { id: "checkout", label: "🚪 Check-out" },
        { id: "clientes", label: "👤 Clientes" }
    ],

    cocinero: [
        { id: "pedidos", label: "🍽️ Pedidos" },
        { id: "menu", label: "📋 Menú" },
        { id: "estadisticas", label: "📊 Estadísticas" }
    ],

    limpieza: [
        { id: "habitaciones", label: "🏠 Habitaciones" },
        { id: "tareas", label: "🧹 Tareas" },
        { id: "incidencias", label: "⚠️ Incidencias" }
    ],

    cliente: [
        { id: "perfil", label: "👤 Mi Perfil" },
        { id: "reservas", label: "📅 Mis Reservas" },
        { id: "pedidos", label: "🍽️ Mis Pedidos" },
        { id: "valoraciones", label: "⭐ Valoraciones" }
    ]
};
