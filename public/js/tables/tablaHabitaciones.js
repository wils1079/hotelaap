export function tablaHabitaciones(habs = []) {
    return `
        <h2>🏠 Habitaciones</h2>
        <br>

        <table class="table-usuarios">
            <thead>
                <tr>
                    <th>Número</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${
                    habs.length > 0
                        ? habs.map(h => `
                            <tr>
                                <td>${h.numero}</td>
                                <td>${h.tipo}</td>
                                <td>$${h.precioPorNoche}</td>
                                <td>${h.estado}</td>
                            </tr>
                        `).join('')
                        : `<tr><td colspan="4">No hay habitaciones.</td></tr>`
                }
            </tbody>
        </table>
    `;
}
