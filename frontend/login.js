document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    const errorMessage = document.querySelector(".error-message");

    // Asegurarnos de que el mensaje de error empiece oculto visualmente si no ha fallado nada
    if (errorMessage) {
        errorMessage.style.display = "none";
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que la página se refresque sola

        // Ocultar el mensaje de error anterior en cada intento
        if (errorMessage) errorMessage.style.display = "none";

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const loginData = {
            email: email,
            password: password
        };

        try {
            // Enviar credenciales al endpoint /login de FastAPI
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar el nombre del usuario en la sesión del navegador por si lo necesitas mostrar en el dashboard
                localStorage.setItem("username", data.user.fullname);
                
                // Redireccionar al panel de control
                window.location.href = "dashboard.html";
            } else {
                // En vez de usar un alert(), mostramos de forma nativa tu caja roja de error del HTML
                if (errorMessage) {
                    errorMessage.style.display = "block";
                } else {
                    alert("⚠️ " + (data.detail || "Datos incorrectos"));
                }
            }

        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("❌ No se pudo conectar con el servidor. Verifica que Uvicorn esté encendido en tu terminal.");
        }
    });
});