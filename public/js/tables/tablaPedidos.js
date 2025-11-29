export function tablaPedidos(pedidos = []) {
    return `
        <h2>🍽️ Pedidos</h2>
        <br>

        <table class="table-usuarios">
            <thead>
                <tr>
                    <th>ID Reserva</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${
                    pedidos.length > 0
                        ? pedidos.map(p => `
                            <tr>
                                <td>${p.reservaId.usuarioId.nombre}</td>
                                <td>${p.descripcion}</td>
                                <td>$${p.precio}</td>
                                <td>${p.estado}</td>
                            </tr>
                        `).join('')
                        : `<tr><td colspan="4">No hay pedidos.</td></tr>`
                }
            </tbody>
        </table>
    `;
}
