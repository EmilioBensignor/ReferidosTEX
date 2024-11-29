// Errores

function mostrarError(elemento, mensaje) {
  const errorIcon = document.createElement('img');
  errorIcon.src = "/content/img/formVueloHotel/icon-error.svg";
  errorIcon.className = 'errorIcon';
  const errorText = document.createElement('p');
  errorText.className = 'error';
  errorText.textContent = mensaje;
  elemento.innerHTML = '';
  elemento.style.display = 'flex';
  errorText.style.display = 'flex';
  elemento.appendChild(errorIcon);
  elemento.appendChild(errorText);
}

function validarNombre(nombre, errorNombre) {
  if (nombre.trim() === '') {
    mostrarError(errorNombre, 'El nombre es requerido');
    return false;
  } else if (nombre.trim().length >= 40) {
    mostrarError(errorNombre, 'El nombre debe tener menos de 40 caracteres');
    return false;
  } else if (nombre.trim().length < 2) {
    mostrarError(errorNombre, 'El nombre de tener al menos 2 caracteres');
    return false;
  } else {
    errorNombre.innerHTML = '';
    return true;
  }
}

function validarMail(mail, errorMail) {
  if (mail.trim() === '') {
    mostrarError(errorMail, 'El mail es requerido');
    return false;
  } else if (!/.+@.+\..+/.test(mail)) {
    mostrarError(errorMail, 'El mail debe contener un @ y . (punto)');
    return false;
  } else {
    errorMail.innerHTML = '';
    return true;
  }
}

let referidosCount = 0;
const maxReferidos = 5;

// Validar Formulario

document.getElementById('btnAgregar').addEventListener('click', function (event) {
  event.preventDefault();

  const nombreInput = document.getElementById('nombre');
  const mailInput = document.getElementById('mail');
  const errorNombre = document.getElementById('errorNombre');
  const errorMail = document.getElementById('errorMail');

  const nombreValido = validarNombre(nombreInput.value, errorNombre);
  const mailValido = validarMail(mailInput.value, errorMail);

  if (nombreValido && mailValido) {
    errorNombre.innerHTML = '';
    errorMail.innerHTML = '';
    errorNombre.style.display = 'none';
    errorMail.style.display = 'none';

    const numeroReferidos = document.getElementById("numeroReferidos");

    referidosCount++;

    numeroReferidos.textContent = `${referidosCount}/${maxReferidos}`;

    const accordionReferidos = document.getElementById('accordionReferidos');
    accordionReferidos.style.display = 'flex';
    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'accordionItem';
    accordionContainer.innerHTML = `
      <div>
        <button class="accordion">
          <p>Referido ${referidosCount}: ${nombreInput.value}</p>
          <span>+</span>
        </button>
        <div class="panel">
          <div class="group-fields">
            <div>
              <label for="nombre${referidosCount}">Nombre del referido</label>
              <input value="${nombreInput.value}" class="input-ref name-ref" type="text" id="nombre${referidosCount}" placeholder="Nombre de referido">
            </div>
            <div>
              <label for="mail${referidosCount}">Mail del referido</label>
              <input value="${mailInput.value}" class="input-ref mail-ref" type="mail" id="mail${referidosCount}" placeholder="Mail del referido">
            </div>
          </div>
        </div>
      </div>
    `;
    accordionReferidos.appendChild(accordionContainer);
    asignarEventosAccordions(); // Reasignar eventos de accordions
    nombreInput.value = '';
    mailInput.value = '';

    if (referidosCount >= maxReferidos) {
      document.getElementById('formAgregar').style.display = 'none';
      document.getElementById('btnAgregar').style.display = 'none';
    }

    if (referidosCount >= 1) {
      document.getElementById('btnEnviarBeneficio').style.display = 'block';
    }
  }
});

// Accordions

function asignarEventosAccordions() {
  const accordions = document.getElementsByClassName("accordion");

  for (let i = 0; i < accordions.length; i++) {
    accordions[i].removeEventListener("click", toggleAccordion);
    accordions[i].addEventListener("click", toggleAccordion);
  }
}

function toggleAccordion() {
  const accordions = document.getElementsByClassName("accordion");
  for (let j = 0; j < accordions.length; j++) {
    const panelToClose = accordions[j].nextElementSibling;
    const spanToClose = accordions[j].querySelector('span');
    if (panelToClose.classList.contains("open") && accordions[j] !== this) {
      panelToClose.classList.remove("open");
      spanToClose.textContent = '+';
    }
  }
  const panel = this.nextElementSibling;
  const span = this.querySelector('span');
  if (panel.classList.contains("open")) {
    panel.classList.remove("open");
    span.textContent = '+';
  } else {
    panel.classList.add("open");
    span.textContent = '-';
  }
}

asignarEventosAccordions();