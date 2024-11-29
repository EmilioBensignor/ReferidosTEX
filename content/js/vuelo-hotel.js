const opcion3Estrellas = document.getElementById('opcion3Estrellas');
const opcion4Estrellas = document.getElementById('opcion4Estrellas');
const opcion5Estrellas = document.getElementById('opcion5Estrellas');
const img3Estrellas = document.getElementById('img3Estrellas');
const img4Estrellas = document.getElementById('img4Estrellas');
const img5Estrellas = document.getElementById('img5Estrellas');
const modalForm = document.getElementById('modalForm');
const cerrar = document.getElementsByClassName("cerrar")[0];

opcion3Estrellas.addEventListener("change", cambiarEstrellas);
opcion4Estrellas.addEventListener("change", cambiarEstrellas);
opcion5Estrellas.addEventListener("change", cambiarEstrellas);

function cambiarEstrellas(event) {
  const opcionSeleccionada = event.target;
  if (opcionSeleccionada.id === '3-estrellas' && opcionSeleccionada.checked) {
    img3Estrellas.src = "/content/img/formVueloHotel/3-estrellas-seleccionado.svg";
    img4Estrellas.src = "/content/img/formVueloHotel/4-estrellas.svg";
    img5Estrellas.src = "/content/img/formVueloHotel/5-estrellas.svg";
  } else if (opcionSeleccionada.id === '4-estrellas' && opcionSeleccionada.checked) {
    img3Estrellas.src = "/content/img/formVueloHotel/3-estrellas.svg";
    img4Estrellas.src = "/content/img/formVueloHotel/4-estrellas-seleccionado.svg";
    img5Estrellas.src = "/content/img/formVueloHotel/5-estrellas.svg";
  } else if (opcionSeleccionada.id === '5-estrellas' && opcionSeleccionada.checked) {
    img3Estrellas.src = "/content/img/formVueloHotel/3-estrellas.svg";
    img4Estrellas.src = "/content/img/formVueloHotel/4-estrellas.svg";
    img5Estrellas.src = "/content/img/formVueloHotel/5-estrellas-seleccionado.svg";
  }
}

function mostrarError(elemento, mensaje) {
  const errorIcon = document.createElement('img');
  errorIcon.src = "/content/img/formVueloHotel/icon-error.svg";
  errorIcon.className = 'errorIcon';
  const errorText = document.createElement('p');
  errorText.className = 'error';
  errorText.textContent = mensaje;
  elemento.innerHTML = '';
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

function validarPaisResidencia(paisResidencia, errorPaisResidencia) {
  if (paisResidencia === '') {
    mostrarError(errorPaisResidencia, 'Elige un país')
  } else {
    errorPaisResidencia.innerHTML = '';
    return true;
  }
}

function validarMail(mail, errorMail) {
  if (mail.trim() === '') {
    mostrarError(errorMail, 'El mail es requerido');
    return false;
  } else if (!/.+@.+\..+/.test(mail)) {
    mostrarError(errorMail, 'El mail es inválido');
    return false;
  } else {
    errorMail.innerHTML = '';
    return true;
  }
}

function validarNumeroWhatsapp(numeroWhatsapp, area, errorWhatsapp) {
  if (numeroWhatsapp.trim() === '' || area.trim() === '') {
    mostrarError(errorWhatsapp, 'Área y número son requeridos');
    return false;
  } else if (parseInt(numeroWhatsapp) <= 0) {
    mostrarError(errorWhatsapp, 'El número de WhatsApp no es válido');
    return false;
  } else {
    errorWhatsapp.innerHTML = '';
    return true;
  }
}

function validarFechas(fechaSalida, fechaVuelta, errorFechas) {
  if (fechaSalida.trim() === '' || fechaVuelta.trim() === '') {
    mostrarError(errorFechas, 'Las fechas son requeridas');
    return false;
  } else {
    let salida = moment(fechaSalida, 'DD/MM/YYYY');
    let vuelta = moment(fechaVuelta, 'DD/MM/YYYY');

    if (!salida.isValid() || !vuelta.isValid()) {
      mostrarError(errorFechas, 'Formato de fecha inválido');
      return false;
    }

    if (vuelta.isBefore(salida)) {
      mostrarError(errorFechas, 'La vuelta debe ser posterior a la salida');
      return false;
    } else if (vuelta.isSame(salida)) {
      mostrarError(errorFechas, 'Las fechas no pueden ser iguales');
      return false;
    } else {
      errorFechas.innerHTML = '';
      return true;
    }
  }
}

function validarRutas(origen, destino, errorRutas) {
  if (origen === 'Ingresa origen' || destino === 'Ingresa destino') {
    mostrarError(errorRutas, 'Las rutas son requeridas');
    return false;
  }
  else if (origen.trim() === destino.trim()) {
    mostrarError(errorRutas, 'Las rutas no pueden ser iguales');
    return false;
  } else {
    errorRutas.innerHTML = '';
    return true;
  }
}

function validarEstrellasHotel(errorEstrellas) {
  const estrellasSeleccionadas = document.querySelector('input[name="estrellasHotel"]:checked');
  if (!estrellasSeleccionadas) {
    mostrarError(errorEstrellas, 'Selecciona una opción de estrellas');
    return false;
  } else {
    errorEstrellas.innerHTML = '';
    return true;
  }
}

function intercambiarOrigenDestino(event) {
  event.preventDefault();
  const origen = $('#origen');
  const destino = $('#destino');

  const origenVal = origen.val();
  const destinoVal = destino.val();
  const origenText = origen.select2('data')[0].text;
  const destinoText = destino.select2('data')[0].text;

  console.log('Valor inicial de origen:', origenVal);
  console.log('Valor inicial de destino:', destinoVal);

  if (origenVal && destinoVal) {
    origen.find('option[value="' + origenVal + '"]').remove();
    destino.find('option[value="' + destinoVal + '"]').remove();

    var newOrigen = new Option(destinoText, destinoVal, true, true);
    var newDestino = new Option(origenText, origenVal, true, true);
    origen.append(newOrigen).trigger('change');
    destino.append(newDestino).trigger('change');

    console.log('Valor intercambiado de origen:', origen.val());
    console.log('Valor intercambiado de destino:', destino.val());
  } else {
    console.log('Ambas rutas deben tener un valor para intercambiar');
  }
}

function validarFormulario() {
  const nombre = document.getElementById('nombre').value;
  const errorNombre = document.getElementById('errorNombre');
  const paisResidencia = document.getElementById('paisResidencia').value;
  const errorPaisResidencia = document.getElementById('errorPaisResidencia');
  const numeroWhatsapp = document.getElementById('numeroWhatsapp').value;
  const area = document.getElementById('area').value;
  const errorWhatsapp = document.getElementById('errorWhatsapp');
  const mail = document.getElementById('mail').value;
  const errorMail = document.getElementById('errorMail');
  const fechaSalida = document.getElementById('fechaSalida').value;
  const fechaVuelta = document.getElementById('fechaVuelta').value;
  const errorFechas = document.getElementById('errorFechas');
  const origen = document.getElementById('origen').value;
  const destino = document.getElementById('destino').value;
  const errorRutas = document.getElementById('errorRutas');
  const errorEstrellas = document.getElementById('errorEstrellas');

  const nombreValido = validarNombre(nombre, errorNombre);
  const paisResidenciaValido = validarPaisResidencia(paisResidencia, errorPaisResidencia);
  const numeroWhatsappValido = validarNumeroWhatsapp(numeroWhatsapp, area, errorWhatsapp);
  const mailValido = validarMail(mail, errorMail);
  const fechasValido = validarFechas(fechaSalida, fechaVuelta, errorFechas);
  const rutasValido = validarRutas(origen, destino, errorRutas);
  const estrellasValidas = validarEstrellasHotel(errorEstrellas);

  return nombreValido && paisResidenciaValido && numeroWhatsappValido && mailValido && fechasValido && rutasValido && estrellasValidas;
}

document.getElementById('vueloHotel').addEventListener('submit', function (event) {
  event.preventDefault();
  if (validarFormulario()) {
    handleSubmit(event);
  }
});

function handleSubmit(event) {
  event.preventDefault();
  formData = new FormData(vueloHotel);
  /* const formData = {
    nombre: document.getElementById('nombre').value,
    paisResidencia: document.getElementById('paisResidencia').value,
    area: document.getElementById('area').value,
    numeroWhatsapp: document.getElementById('numeroWhatsapp').value,
    mail: document.getElementById('mail').value,
    fechaSalida: document.getElementById('fechaSalida').value,
    fechaVuelta: document.getElementById('fechaVuelta').value,
    origen: document.getElementById('origen').value,
    destino: document.getElementById('destino').value,
    estrellasHotel: document.querySelector('input[name="estrellasHotel"]:checked').value,
  };
  console.log(formData);
 */
  $.ajax(
    {
      type: "POST",
      url: "/cgi-bin/tevue2zoh.pl",
      data: formData,
      processData: false,
      contentType: false,
      xhrFields: { withCredentials: true },
      beforeSend: function (jqXHR, settings) {
        myXHR = settings.xhr();
      },
      error: function (jqXHR, textStatus, errorMessage) {
        console.log(errorMessage);
      },
      success: function (data) {
        if (data != "OK") {
          window.alert(data);
        } else {
          modalForm.style.display = "flex";
          vaciarCampos();
        }
      }
    }
  );

};

cerrar.onclick = function () {
  modalForm.style.display = "none";
  window.location.href = "https://tourexperto.com/";
}

window.onclick = function (event) {
  if (event.target == modalForm) {
    modalForm.style.display = "none";
    setTimeout(function () {
      window.location.href = "https://tourexperto.com/";
    }, 2000);
  }
}

function vaciarCampos() {
  document.getElementById('nombre').value = '';
  $('#paisResidencia').val('País de residencia').trigger('change');
  document.getElementById('area').value = '';
  document.getElementById('numeroWhatsapp').value = '';
  document.getElementById('mail').value = '';
  document.getElementById('fechaSalida').value = '';
  document.getElementById('fechaVuelta').value = '';
  $('#origen').val('Ingresa origen').trigger('change');
  $('#destino').val('Ingresa destino').trigger('change');
  document.getElementById('3-estrellas').checked = false;
  document.getElementById('4-estrellas').checked = false;
  document.getElementById('5-estrellas').checked = false;

  document.getElementById('img3Estrellas').src = "/content/img/formVueloHotel/3-estrellas.svg";
  document.getElementById('img4Estrellas').src = "/content/img/formVueloHotel/4-estrellas.svg";
  document.getElementById('img5Estrellas').src = "/content/img/formVueloHotel/5-estrellas.svg";
}

function matchCustom(params, data) {
  // If there are no search terms, return all of the data
  if ($.trim(params.term) === '') {
    return data;
  }

  // Do not display the item if there is no 'text' property
  if (typeof data.text === 'undefined') {
    return null;
  }

  // `params.term` should be the term that is used for searching
  // `data.text` is the text that is displayed for the data object
  if (data.text.indexOf(params.term) > -1) {
    var modifiedData = $.extend({}, data, true);
    modifiedData.text += ' (matched)';

    // You can return modified objects from here
    // This includes matching the `children` how you want in nested data sets
    return modifiedData;
  }

  // Return `null` if the term should not be displayed
  return null;
}

$(document).ready(function () {
  $('.selectPaisResidencia').select2();
});
$('#origen').select2(
  {
    language: {
      inputTooShort: function (args) {
        return "Ingresa 3 o m\u00E1s caracteres";
      },
      errorLoading: function () {
        return "Error";
      },
      loadingMore: function () {
        return "Cargando m\u00E1s";
      },
      noResults: function () {
        return "No se encontraron resultados";
      },
      searching: function () {
        return "Buscando...";
      },
      maximumSelected: function (args) {
        return "Solo puedes seleccionar una opción"
      }
    },
    minimumResultsForSearch: Infinity,
    maximumSelectionLength: 1,
    dropdownCssClass: "search",
    minimumInputLength: 3,
    dropdownParent: $('#origen').parent(),
    allowClear: true,
    placeholder: "País o ciudad de origen",
    ajax: {
      url: '/cgi-bin/tedestinos.pl',
      dataType: 'json',
      delay: 250,
      data: function (data) {
        return {
          term: data.term
        };
      },
      processResults: function (response) {
        return {
          results: response
        };
      },
      cache: true
    }
  });
$('#destino').select2(
  {
    language: {
      inputTooShort: function (args) {
        return "Ingresa 3 o m\u00E1s caracteres";
      },
      errorLoading: function () {
        return "Error";
      },
      loadingMore: function () {
        return "Cargando m\u00E1s";
      },
      noResults: function () {
        return "No se encontraron resultados";
      },
      searching: function () {
        return "Buscando...";
      },
      maximumSelected: function (args) {
        return "Solo puedes seleccionar una opción"
      }
    },
    minimumResultsForSearch: Infinity,
    maximumSelectionLength: 1,
    dropdownCssClass: "search",
    minimumInputLength: 3,
    dropdownParent: $('#destino').parent(),
    allowClear: true,
    placeholder: "País o ciudad de destino",
    ajax: {
      url: '/cgi-bin/tedestinos.pl',
      dataType: 'json',
      delay: 250,
      data: function (data) {
        return {
          term: data.term
        };
      },
      processResults: function (response) {
        return {
          results: response
        };
      },
      cache: true
    }
  });
$(function () {
  $('input[name="fechaVuelta"]').daterangepicker({
    autoUpdateInput: false,
    singleDatePicker: true,
    showDropdowns: true,
    drops: 'auto',
    minDate: moment().startOf('hour'),
    locale: {
      cancelLabel: 'Clear'
    }
  });
  $('input[name="fechaVuelta"]').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('DD/MM/YYYY'));
  });
  $('input[name="fechaVuelta"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
  });
});
$(function () {
  $('input[name="fechaSalida"]').daterangepicker({
    autoUpdateInput: false,
    singleDatePicker: true,
    showDropdowns: true,
    drops: 'auto',
    minDate: moment().startOf('hour'),
    locale: {
      cancelLabel: 'Clear'
    }
  });
  $('input[name="fechaSalida"]').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.endDate.format('DD/MM/YYYY'));
  });
  $('input[name="fechaSalida"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
  });
});
