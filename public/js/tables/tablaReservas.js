export function tablaReservas(reservas = []) {
    return `
        <h2>📅 Reservas</h2>
        <br>

        <table class="table-usuarios">
            <thead>
                <tr>
                    <th>ID Usuario</th>
                    <th>ID Habitación</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Total</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${
                    reservas.length > 0
                        ? reservas.map(r => `
                            <tr>
                                <td>${r.usuarioId}</td>
                                <td>${r.habitacionId}</td>
                                <td>${new Date(r.fechaEntrada).toLocaleDateString()}</td>
                                <td>${new Date(r.fechaSalida).toLocaleDateString()}</td>
                                <td>$${r.total}</td>
                                <td>${r.estado}</td>
                            </tr>
                        `).join('')
                        : `<tr><td colspan="6">No hay reservas.</td></tr>`
                }
            </tbody>
        </table>
    `;
}
