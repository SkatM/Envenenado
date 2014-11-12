

//
function ev_doubleCheckboxPecados (p) {
	var doubleCheckbox = document.getElementById('ev-pj-form-pecados-'+p);
	var divRes = document.getElementById('ev-pj-resultado-pecados-'+p);
	if (ev_pj_vars.pecados[p] > 0) {
		divRes.innerHTML = doubleCheckbox.innerHTML + ', ';
		doubleCheckbox.className = 'ev-double-checkbox ev-double-checkbox-pecados-' + ev_pj_vars.pecados[p];
	}
	doubleCheckbox.addEventListener('click', function () {
		ev_pj_vars.pecados[p]++;
		switch (ev_pj_vars.pecados[p]) {
			case 0: divRes.innerHTML = ''; break;
			case 1: divRes.innerHTML = this.innerHTML + ', '; break;
			case 2: divRes.innerHTML = this.innerHTML + ', '; break;
			default: divRes.innerHTML = ''; ev_pj_vars.pecados[p] = 0; break;
		}
		this.className = 'ev-double-checkbox ev-double-checkbox-pecados-' + ev_pj_vars.pecados[p];
		ev_diabloAlma();
		ev_temeridad();
	}, false);
}


function ev_diabloAlma () {
	ev_pj_vars.diablo = 0;
	for (var i in ev_pj_vars.pecados) if (ev_pj_vars.pecados[i] > 0) ev_pj_vars.diablo++;
	if (ev_pj_vars.diablo < 2) ev_pj_vars.diablo = 2;
	if (ev_pj_vars.diablo > 6) ev_pj_vars.diablo = 6;
	var divResDiablo = document.getElementById('ev-pj-resultado-diablo');
	divResDiablo.innerHTML = ev_pj_vars.diablo;
	ev_pj_vars.alma = 8;
	ev_pj_vars.alma -= ev_pj_vars.diablo;
	var divResAlma = document.getElementById('ev-pj-resultado-alma');
	divResAlma.innerHTML = ev_pj_vars.alma;
}


function ev_doubleCheckboxInfortunios (i) {
	var doubleCheckbox = document.getElementById('ev-pj-form-infortunios-'+i);
	var divRes = document.getElementById('ev-pj-resultado-infortunios-'+i);
	if (ev_pj_vars.infortunios[i] != 0) {
		doubleCheckbox.className = 'ev-double-checkbox ev-double-checkbox-infortunios-' + ev_pj_vars.infortunios[i];
		if (1 == ev_pj_vars.infortunios[i]) divRes.innerHTML = doubleCheckbox.innerHTML + ', ';
		else if (2 == ev_pj_vars.infortunios[i]) divRes.innerHTML = doubleCheckbox.innerHTML + '(X), ';
	}
	doubleCheckbox.addEventListener('click', function () {
		ev_pj_vars.infortunios[i]++;
		switch (ev_pj_vars.infortunios[i]) {
			case 0: divRes.innerHTML = ''; break;
			case 1: divRes.innerHTML = this.innerHTML + ', '; break;
			case 2: divRes.innerHTML = this.innerHTML + '(X), '; break;
			default: divRes.innerHTML = ''; ev_pj_vars.infortunios[i] = 0; break;
		}
		this.className = 'ev-double-checkbox ev-double-checkbox-infortunios-' + ev_pj_vars.infortunios[i];
		ev_brutalidad();
		ev_temeridad();
		ev_displayMutilacion('ev-pj-div-mutilacion');
	//	ev_displayMutilacion('ev-pj-resultado-mutilacion');
	}, false);
}


function ev_brutalidad () {
	ev_pj_vars.brutalidad = 0;
	ev_pj_vars.xxx = '';
	for (var i in ev_pj_vars.infortunios) if (ev_pj_vars.infortunios[i] > 0) {
		ev_pj_vars.brutalidad++;
		if (2 == ev_pj_vars.infortunios[i]) ev_pj_vars.xxx += 'X';
	}
	if (ev_pj_vars.brutalidad < 2) ev_pj_vars.brutalidad = 2;
	if (ev_pj_vars.brutalidad > 6) ev_pj_vars.brutalidad = 6;
	var divResBrutalidad = document.getElementById('ev-pj-resultado-brutalidad');
	divResBrutalidad.innerHTML = ev_pj_vars.brutalidad;
	var divResXXX = document.getElementById('ev-pj-resultado-xxx');
	divResXXX.innerHTML = ev_pj_vars.xxx;
}


function ev_checkboxAmbiciones (a) {
	var id = '#ev-pj-form-ambiciones-' + a;
	var divForm = $(id);
	var divResult = document.getElementById('ev-pj-resultado-ambiciones-'+a);
	var value = divForm[0].value;
	divForm.checkboxradio();
	if (ev_pj_vars.ambiciones[a]) {
		divForm.prop('checked', true).checkboxradio('refresh');
		divResult.innerHTML = value + ', ';
	}
	else divForm.prop('checked', false).checkboxradio('refresh');
	if (ev_pj_vars.ambiciones[a]) ;
	divForm.change(function () {
		if (this.checked) {
			ev_pj_vars.ambiciones[a] = true;
			divForm.prop('checked', true).checkboxradio('refresh');
			divResult.innerHTML = value + ', ';
		}
		else {
			ev_pj_vars.ambiciones[a] = false;
			divForm.prop('checked', false).checkboxradio('refresh');
			divResult.innerHTML = '';
		}
		ev_ambicion();
		ev_temeridad();
	});
}


function ev_ambicion () {
	ev_pj_vars.ambicion = 0;
	for (var i in ev_pj_vars.ambiciones) if (ev_pj_vars.ambiciones[i]) ev_pj_vars.ambicion++;
	if (ev_pj_vars.ambicion < 2) ev_pj_vars.ambicion = 2;
	if (ev_pj_vars.ambicion > 6) ev_pj_vars.ambicion = 6;
	document.getElementById('ev-pj-resultado-ambicion').innerHTML = ev_pj_vars.ambicion;
}


function ev_temeridad () {
	ev_pj_vars.temeridad = 0;
	ev_pj_vars.temeridad = ev_pj_vars.alma;
	if (ev_pj_vars.temeridad < ev_pj_vars.diablo) ev_pj_vars.temeridad = ev_pj_vars.diablo;
	if (ev_pj_vars.temeridad < ev_pj_vars.brutalidad) ev_pj_vars.temeridad = ev_pj_vars.brutalidad;
	if (ev_pj_vars.temeridad < ev_pj_vars.ambicion) ev_pj_vars.temeridad = ev_pj_vars.ambicion;
	document.getElementById('ev-pj-resultado-temeridad').innerHTML = ev_pj_vars.temeridad;
}


function ev_perfilCheckbox (p) {
	var id = '#ev-pj-form-perfil-' + p;
	var divForm = $(id);
	var divResult = document.getElementById('ev-pj-resultado-perfil-'+p);
	var value = divForm[0].value;
	divForm.checkboxradio();
	if (ev_pj_vars.perfil[p]) {
		divForm.prop('checked', true).checkboxradio('refresh');
		divResult.innerHTML = value + ', ';
	}
	else divForm.prop('checked', false).checkboxradio('refresh');
	if (ev_pj_vars.perfil[p]) ;
	divForm.change(function () {
		if (this.checked) {
			ev_pj_vars.perfil[p] = true;
			divForm.prop('checked', true).checkboxradio('refresh');
			divResult.innerHTML = value + ', ';
		}
		else {
			ev_pj_vars.perfil[p] = false;
			divForm.prop('checked', false).checkboxradio('refresh');
			divResult.innerHTML = '';
		}
		ev_perfil();
	});
}


function ev_perfilSelect (ps) {
	var select = document.getElementsByName('ev-pj-form-perfil-'+ps)[0];
	var divRes = document.getElementById('ev-pj-resultado-perfil-'+ps);
	if (ev_pj_vars.perfil[ps]) {
		select.value = ev_pj_vars.perfil[ps];
		$('select[name="ev-pj-form-perfil-'+ps+'"]').selectmenu();
		$('select[name="ev-pj-form-perfil-'+ps+'"]').selectmenu('refresh', true);
	}
	else ev_pj_vars.perfil[ps] = select.value;
	divRes.innerHTML = select.value + ', ';
	select.addEventListener('change', function () {
		ev_pj_vars.perfil[ps] = this.value;
		divRes.innerHTML = this.value + ', ';
		ev_perfil();
	}, false);
}


function ev_perfil () {
	ev_pj_vars.puntosPerfil = 2;
	for (var i in ev_pj_vars.perfil) if (ev_pj_vars.perfil[i]) ev_pj_vars.puntosPerfil++;
	document.getElementById('ev-pj-resultado-perfil-puntosperfil').innerHTML = ev_pj_vars.puntosPerfil;
}


function ev_displayMutilacion (div) {
	var div = document.getElementById(div);
	if (ev_pj_vars.infortunios.mutilado > 0) div.style.display = 'block';
	else div.style.display = 'none';
}


//

