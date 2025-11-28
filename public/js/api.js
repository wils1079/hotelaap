export async function realizarPeticionGet(url) {
  try {
    const token = localStorage.getItem("token");

    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) throw new Error("Error en la petición");

    const datos = await respuesta.json();
    return datos;

  } catch (error) {
    console.error(error);
    return null;
  }
}