

var ev_pj_vars = null;
var ev_dt_vars = null;
var ev_pj_once = false;
var ev_dt_once = false;


// menu
$(document).bind('pagebeforeshow', function (event, data) {
	var pageId = $.mobile.activePage.attr('id');
	// panel
	var panel = document.getElementById('ev-main-panel');
	var activePage = document.getElementById(pageId);
	panel.parentNode.removeChild(panel);
	activePage.appendChild(panel);
	$.mobile.activePage.find('#ev-main-panel').panel();
	//
});


// PJ
$(document).bind('pagecreate', '#ev-pj', function (event, data) {
	if (ev_pj_once) return;
	ev_pj_once = true;
	ev_pj_vars = {
		'nombre': '',
		'segundoACargo': 'si',
		'cargo': 'contramaestre',
		'pecados': {
			'adulterio': 0,
			'asesinato': 0,
			'blasfemia': 0,
			'idolatria': 0,
			'motin': 0,
			'robo': 0,
			'sodomia': 0,
			'violacion': 0
		},
		'infortunios': {
			'arrestado': 0,
			'condenado': 0,
			'encarcelado': 0,
			'intentodeasesinato': 0,
			'latigazos': 0,
			'maldito': 0,
			'marcado': 0,
			'mutilado': 0,
			'paliza': 0,
			'repudiado': 0,
			'reclutadoalafuerza': 0,
			'torturado': 0,
			'violado': 0
		},
		'ambiciones': {
			'sercapitan': false,
			'tenertierras': false,
			'serperdonado': false,
			'vivirparasiempre': false,
			'serrecordadoparasiempre': false,
			'seradmiradoporlasociedad': false,
			'vengarsedealguien': false,
			'vengarsedealguiendemejorposicion': false,
			'fornicarconelpiratadeotrojugador': false,
			'fornicarconhijaohijodealguiendemejorposicion': false,
			'escupiralacaradedios': false,
			'escupiralacaradeldiablo': false
		},
		'perfil': {
			'cuchillo': false,
			'espada': false,
			'pistola': false,
			'select1': '',
			'select2': ''
		},
		'mutilacion': {
			'select': null,
			'input': ''
		}
	}

	// nombre
	var inputNombre = document.getElementsByName('ev-pj-form-nombre')[0];
	var divResNombre = document.getElementById('ev-pj-resultado-nombre');
	if (ev_pj_vars.nombre) inputNombre.value = ev_pj_vars.nombre;
	else ev_pj_vars.nombre = '';
	divResNombre.innerHTML = inputNombre.value;
	inputNombre.addEventListener('change', function () {
		ev_pj_vars.nombre = this.value;
		divResNombre.innerHTML = this.value;
	}, false);
	// cargo
	var selectCargo = document.getElementsByName('ev-pj-form-cargo')[0];
	var divResCargo = document.getElementById('ev-pj-resultado-cargo');
	if (ev_pj_vars.cargo) {
		selectCargo.value = ev_pj_vars.cargo;
		$('select[name="ev-pj-form-cargo"]').selectmenu();
		$('select[name="ev-pj-form-cargo"]').selectmenu('refresh', true);
	}
	else ev_pj_vars.cargo = selectCargo.value;
	divResCargo.innerHTML = selectCargo.value;
	selectCargo.addEventListener('change', function () {
		ev_pj_vars.cargo = this.value;
		divResCargo.innerHTML = this.value;
	}, false);
	// segundo a cargo
	var selectSegundoACargo = document.getElementsByName('ev-pj-form-segundoacargo')[0];
	if (ev_pj_vars.segundoACargo); {
		$('select[name="ev-pj-form-segundoacargo"]').selectmenu();
		$('select[name="ev-pj-form-segundoacargo"]').selectmenu('refresh', true);
	}
	selectSegundoACargo.addEventListener('change', function () {
		ev_pj_vars.segundoACargo = this.value;
	}, false);
	// pecados, diablo y alma
	var pecados = ['adulterio', 'asesinato', 'blasfemia', 'idolatria', 'motin', 'robo', 'sodomia', 'violacion'];
	for (var i = 0; i < pecados.length; i++) ev_doubleCheckboxPecados(pecados[i]);
	ev_diabloAlma();
	// infortunios, brutalidad y mutilación
	var infortunios = [
		'arrestado',
		'condenado',
		'encarcelado',
		'intentodeasesinato',
		'latigazos',
		'maldito',
		'marcado',
		'mutilado',
		'paliza',
		'repudiado',
		'reclutadoalafuerza',
		'torturado',
		'violado'
	];
	for (var i = 0; i < infortunios.length; i++) ev_doubleCheckboxInfortunios(infortunios[i]);
	ev_brutalidad();
	// ambiciones y temeridad
	var ambiciones = [
		'sercapitan',
		'tenertierras',
		'serperdonado',
		'vivirparasiempre',
		'serrecordadoparasiempre',
		'seradmiradoporlasociedad',
		'vengarsedealguien',
		'vengarsedealguiendemejorposicion',
		'fornicarconelpiratadeotrojugador',
		'fornicarconhijaohijodealguiendemejorposicion',
		'escupiralacaradedios',
		'escupiralacaradeldiablo'
	];
	for (var i = 0; i < ambiciones.length; i++) ev_checkboxAmbiciones(ambiciones[i]);
	ev_ambicion();
	ev_temeridad();
	// perfil
	var perfil = ['cuchillo', 'espada', 'pistola'];
	for (var i = 0; i < perfil.length; i++) ev_perfilCheckbox(perfil[i]);
	var perfilSelect = ['select1', 'select2'];
	for (var i = 0; i < perfilSelect.length; i++) ev_perfilSelect(perfilSelect[i]);
	ev_perfil();
	// perfil. mutilación
	ev_displayMutilacion('ev-pj-div-mutilacion');
	var selectMutilacion = document.getElementsByName('ev-pj-form-mutilacion-select')[0];
	var inputOtra = document.getElementsByName('ev-pj-form-mutilacion-input')[0];
	if (ev_pj_vars.mutilacion.select) {
		selectMutilacion.value = ev_pj_vars.mutilacion.select;
		$('select[name="ev-pj-form-mutilacion-select"]').selectmenu();
		$('select[name="ev-pj-form-mutilacion-select"]').selectmenu('refresh', true);
	}
	selectMutilacion.addEventListener('change', function () {
		ev_pj_vars.mutilacion.select = this.value;
		if ('otra' == ev_pj_vars.mutilacion.select) inputOtra.style.display = '';
		else inputOtra.style.display = 'none';
	}, false);
	if (ev_pj_vars.mutilacion.select != 'otra') inputOtra.style.display = 'none';
	if (ev_pj_vars.mutilacion.input) inputOtra.value = ev_pj_vars.mutilacion.input;
	inputOtra.addEventListener('change', function () {
		ev_pj_vars.mutilacion.input = this.value;
	}, false);
});


// Daga y tripulac.
$(document).bind('pagecreate', '#ev-daga-tripulacion', function (event, data) {
	if (ev_dt_once) return;
	ev_dt_once = true;
	ev_dt_vars = {
		'daga': {
			'select1': 'es r&aacute;pida',
			'select2': 'es r&aacute;pida',
			'puntoFuerte': 'perseguir y escapar',
			'perfil': 10
		},
		'tripulacion': {
			'select1': null,
			'select2': null,
			'select3': null,
			'perfil': 6
		}
	}

	// daga. select1
	var selectDaga1 = document.getElementsByName('ev-dt-daga-form-select1')[0];
	var divResSelectDaga1 = document.getElementById('ev-dt-daga-resultado-select1');
	if (ev_dt_vars.daga.select1) {
		selectDaga1.value = ev_dt_vars.daga.select1;
		$('select[name="ev-dt-daga-form-select1"]').selectmenu();
		$('select[name="ev-dt-daga-form-select1"]').selectmenu('refresh', true);
	}
	else ev_dt_vars.daga.select1 = selectDaga1.value;
	divResSelectDaga1.innerHTML = selectDaga1.value;
	selectDaga1.addEventListener('change', function () {
		ev_dt_vars.daga.select1 = this.value;
		divResSelectDaga1.innerHTML = this.value;
	}, false);
	// daga. select2
	var selectDaga2 = document.getElementsByName('ev-dt-daga-form-select2')[0];
	var divResSelectDaga2 = document.getElementById('ev-dt-daga-resultado-select2');
	if (ev_dt_vars.daga.select2) {
		selectDaga2.value = ev_dt_vars.daga.select2;
		$('select[name="ev-dt-daga-form-select2"]').selectmenu();
		$('select[name="ev-dt-daga-form-select2"]').selectmenu('refresh', true);
	}
	else ev_dt_vars.daga.select2 = selectDaga2.value;
	divResSelectDaga2.innerHTML = selectDaga2.value;
	selectDaga2.addEventListener('change', function () {
		ev_dt_vars.daga.select2 = this.value;
		divResSelectDaga2.innerHTML = this.value;
	}, false);
	// daga. punto fuerte
	var selectPuntoFuerte = document.getElementsByName('ev-dt-daga-form-puntofuerte')[0];
	var divResPuntoFuerte = document.getElementById('ev-dt-daga-resultado-puntofuerte');
	if (ev_dt_vars.daga.puntoFuerte) {
		selectPuntoFuerte.value = ev_dt_vars.daga.puntoFuerte;
		$('select[name="ev-dt-daga-form-puntofuerte"]').selectmenu();
		$('select[name="ev-dt-daga-form-puntofuerte"]').selectmenu('refresh', true);
	}
	else ev_dt_vars.daga.puntoFuerte = selectPuntoFuerte.value;
	divResPuntoFuerte.innerHTML = selectPuntoFuerte.value;
	selectPuntoFuerte.addEventListener('change', function () {
		ev_dt_vars.daga.puntoFuerte = this.value;
		divResPuntoFuerte.innerHTML = this.value;
	}, false);
	// tripulacion. select1
	var selectTrip1 = document.getElementsByName('ev-dt-tripulacion-form-select1')[0];
	var divResSelectTrip1 = document.getElementById('ev-dt-tripulacion-resultado-select1');
	if (ev_dt_vars.tripulacion.select1) {
		selectTrip1.value = ev_dt_vars.tripulacion.select1;
		$('select[name="ev-dt-tripulacion-form-select1"]').selectmenu();
		$('select[name="ev-dt-tripulacion-form-select1"]').selectmenu('refresh', true);
	}
	else ev_dt_vars.tripulacion.select1 = selectTrip1.value;
	divResSelectTrip1.innerHTML = selectTrip1.value;
	selectTrip1.addEventListener('change', function () {
		ev_dt_vars.tripulacion.select1 = this.value;
		divResSelectTrip1.innerHTML = this.value;
	}, false);
	// tripulacion. select2
	var selectTrip2 = document.getElementsByName('ev-dt-tripulacion-form-select2')[0];
	var divResSelectTrip2 = document.getElementById('ev-dt-tripulacion-resultado-select2');
	if (ev_dt_vars.tripulacion.select2) {
		selectTrip2.value = ev_dt_vars.tripulacion.select2;
		$('select[name="ev-dt-tripulacion-form-select2"]').selectmenu();
		$('select[name="ev-dt-tripulacion-form-select2"]').selectmenu('refresh', true);
	}
	else ev_dt_vars.tripulacion.select2 = selectTrip2.value;
	divResSelectTrip2.innerHTML = selectTrip2.value;
	selectTrip2.addEventListener('change', function () {
		ev_dt_vars.tripulacion.select2 = this.value;
		divResSelectTrip2.innerHTML = this.value;
	}, false);
	// tripulacion. select3
	var selectTrip3 = document.getElementsByName('ev-dt-tripulacion-form-select3')[0];
	var divResSelectTrip3 = document.getElementById('ev-dt-tripulacion-resultado-select3');
	if (ev_dt_vars.tripulacion.select3) {
		selectTrip3.value = ev_dt_vars.tripulacion.select3;
		$('select[name="ev-dt-tripulacion-form-select3"]').selectmenu();
		$('select[name="ev-dt-tripulacion-form-select3"]').selectmenu('refresh', true);
	}
	else ev_dt_vars.tripulacion.select3 = selectTrip3.value;
	divResSelectTrip3.innerHTML = selectTrip3.value;
	selectTrip3.addEventListener('change', function () {
		ev_dt_vars.tripulacion.select3 = this.value;
		divResSelectTrip3.innerHTML = this.value;
	}, false);
});

