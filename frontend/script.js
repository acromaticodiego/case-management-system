document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mostrar el nombre real del usuario logueado en la Navbar
    const loggedUserElement = document.querySelector(".user-profile strong");
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && loggedUserElement) {
        loggedUserElement.textContent = storedUsername;
    }

    // 2. Base de Datos Simulada con URLs de imágenes reales para pruebas
    const casos = [
        {
            id: 1024,
            tag: "Urgente",
            tagClass: "urgent-tag",
            name: "Caso #1024 - Incidencia de Red",
            date: "25 de Junio, 2026",
            description: "Fallo detectado en el nodo principal de distribución de fibra. El sector reporta pérdida de paquetes severa afectando a clientes corporativos.",
            // Usamos imágenes reales de servidores de telecomunicaciones / servidores
            images: [
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400", 
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400"
            ],
            assignee: "Soporte Técnico Nivel 2",
            coords: [4.6097, -74.0817], // Bogotá
            status: "En Proceso"
        },
        {
            id: 1025,
            tag: "Medio",
            tagClass: "medium-tag",
            name: "Caso #1025 - Mantenimiento Eléctrico",
            date: "24 de Junio, 2026",
            description: "Mantenimiento preventivo programado en la subestación de energía de respaldo del data center secundario.",
            images: [
                "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400"
            ],
            assignee: "Infraestructura Física",
            coords: [4.6150, -74.0750], 
            status: "Abierto"
        },
        {
            id: 1026,
            tag: "Bajo",
            tagClass: "low-tag",
            name: "Caso #1026 - Actualización de Firewall",
            date: "23 de Junio, 2026",
            description: "Despliegue de parches de seguridad perimetral en los routers centrales del cliente principal.",
            images: [
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400"
            ],
            assignee: "Seguridad de la Información",
            coords: [4.6020, -74.0850],
            status: "Completado"
        }
    ];

    // 3. Inicializar el mapa de Leaflet
    const map = L.map('map').setView([4.6097, -74.0817], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 4. Elementos del DOM
    const panelPlaceholder = document.getElementById("panelPlaceholder");
    const panelRealContent = document.getElementById("panelRealContent");
    
    const caseTag = document.getElementById("caseTag");
    const caseName = document.getElementById("caseName");
    const caseDate = document.getElementById("caseDate");
    const caseDescription = document.getElementById("caseDescription");
    const caseAssignee = document.getElementById("caseAssignee");
    const caseCoords = document.getElementById("caseCoords");
    const caseStatus = document.getElementById("caseStatus");
    const imageGallery = document.querySelector(".image-gallery");

    // 5. Función para actualizar el panel derecho
    function mostrarDetalleCaso(caso) {
        panelPlaceholder.style.display = "none";
        panelRealContent.classList.remove("hidden");

        caseTag.textContent = caso.tag;
        caseTag.className = `case-tag ${caso.tagClass}`;
        caseName.textContent = caso.name;
        caseDate.textContent = caso.date;
        caseDescription.textContent = caso.description;
        caseAssignee.textContent = caso.assignee;
        caseCoords.textContent = `${caso.coords[0]}, ${caso.coords[1]}`;
        caseStatus.textContent = caso.status;

        // 🆕 RENDERIZAR IMÁGENES REALES
        imageGallery.innerHTML = ""; // Limpiar la galería vieja
        caso.images.forEach(urlImg => {
            const imgBox = document.createElement("div");
            imgBox.className = "image-box";
            
            // Inyectamos la etiqueta img en lugar del icono estático de archivo
            imgBox.innerHTML = `
                <img src="${urlImg}" alt="Evidencia del caso" class="gallery-thumb">
            `;
            
            // Efecto extra: Si el usuario da clic en la imagen, se abre en grande en otra pestaña
            imgBox.addEventListener("click", () => {
                window.open(urlImg, '_blank');
            });

            imageGallery.appendChild(imgBox);
        });
    }

    // 6. Dibujar los marcadores
    casos.forEach(caso => {
        const marker = L.marker(caso.coords).addTo(map);
        marker.bindPopup(`<b>${caso.name}</b>`);
        marker.on('click', () => {
            mostrarDetalleCaso(caso);
        });
    });
});