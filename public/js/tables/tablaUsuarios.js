export function tablaUsuarios(usuarios = []) {
        return `
        <div class="dashboard-section active" id="overview">
            <h2>📊 Usuarios Registrados</h2>
            <p>Total: <strong>${usuarios ? usuarios.length : 0}</strong></p>

            <div class="table-container">
                <table class="table-usuarios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            usuarios && usuarios.length > 0
                                ? usuarios.map(u => `
                                    <tr>
                                        <td>${u.nombre}</td>
                                        <td>${u.email}</td>
                                        <td>${u.rol}</td>
                                        <td>${u.estado ?? "Activo"}</td>
                                    </tr>
                                `).join('')
                                : `
                                    <tr>
                                        <td colspan="4" style="text-align:center; padding:15px;">
                                            No hay usuarios registrados.
                                        </td>
                                    </tr>
                                `
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
