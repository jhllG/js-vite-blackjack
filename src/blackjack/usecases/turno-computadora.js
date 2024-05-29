import { crearCartaHTML, pedirCarta, valorCarta } from "./";

/**
 * turno de la computadora
 * @param {Number} puntosMinimos puntos minimos que la computadora necesita para ganar
 * @param {HTMLElement} puntosHTML elemento HTML para mostrar los puntos
 * @param {HTMLElement} divCartasComputadora elemento HTML para mostrar los puntos
 * @param {Array<String>} deck
 */
export const turnoComputadora = (
  puntosMinimos,
  puntosHTML,
  divCartasComputadora,
  deck = []
) => {
  if (!puntosMinimos) throw new Error("Puntos mínimos son necesarios");
  if (!puntosHTML) throw new Error("Argumento puntos mínimos son necesarios");

  let puntosComputadora = 0;

  do {
    const carta = pedirCarta(deck);

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML.innerText = puntosComputadora;

    const imgCarta = crearCartaHTML(carta);

    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    let mensaje;
    if (puntosComputadora === puntosMinimos) {
      mensaje = "🤝 ¡Empate! Ambos tienen la misma cantidad de puntos :)";
    } else if (
      puntosMinimos > 21 ||
      (puntosComputadora > puntosMinimos && puntosComputadora <= 21)
    ) {
      mensaje = "🤖 ¡La computadora gana! Tu puntaje superó los 21 puntos.";
    } else {
      mensaje = "🥳 ¡Ganaste! La computadora se pasó de 21 puntos.";
    }

    document.getElementById("mensajeModal").innerText = mensaje;
    document.getElementById("miModal").style.display = "block";

    document.getElementById("cerrarModal").addEventListener("click", () => {
      document.getElementById("miModal").style.display = "none";
    });
  }, 100);
};
