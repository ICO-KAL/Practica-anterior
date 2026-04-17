async function cargarMensaje() {
	const status = document.getElementById("status");

	try {
		const response = await fetch("/api/mensaje");
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "No se pudo obtener el mensaje");
		}

		const prefix = data.source === "database"
			? "Mensaje desde MySQL"
			: "Mensaje de la aplicación";

		status.textContent = `${prefix}: ${data.mensaje}`;
	} catch (error) {
		status.textContent = `Error de conexión: ${error.message}`;
	}
}

cargarMensaje();