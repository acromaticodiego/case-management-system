document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que la página se recargue sola

        // 1. Capturar los valores usando los nuevos IDs limpios de rastreo
        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("p1").value;
        const confirm_password = document.getElementById("p2").value;

        // 2. Validación básica en el frontend antes de enviar
        if (password !== confirm_password) {
            alert("❌ Las claves ingresadas no coinciden.");
            return;
        }

        // 3. Estructurar los datos EXACTAMENTE como los pide FastAPI en el backend
        const userData = {
            fullname: fullname,
            email: email,
            password: password,
            confirm_password: confirm_password
        };

        try {
            // 4. Enviar los datos al backend usando fetch
            const response = await fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("✨ " + data.message);
                form.reset(); // Limpia los campos del formulario
                window.location.href = "index.html"; // Redirecciona al Login
            } else {
                // Muestra el error específico enviado por FastAPI
                alert("⚠️ Error: " + (data.detail || "No se pudo realizar el registro"));
            }

        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("❌ No se pudo conectar con el servidor backend. Asegúrate de que Uvicorn esté corriendo.");
        }
    });
});