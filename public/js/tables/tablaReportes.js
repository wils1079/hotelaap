export function tablaReportes(reportes = []) {
    return `
        <h2>📈 Reportes</h2>
        <br>

        <table class="table-usuarios">
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Detalles</th>
                </tr>
            </thead>
            <tbody>
                ${
                    reportes.length > 0
                        ? reportes.map(r => `
                            <tr>
                                <td>${r.tipo}</td>
                                <td>${new Date(r.fecha).toLocaleDateString()}</td>
                                <td>${JSON.stringify(r.contenido)}</td>
                            </tr>
                        `).join('')
                        : `<tr><td colspan="3">No hay reportes.</td></tr>`
                }
            </tbody>
        </table>
    `;
}
