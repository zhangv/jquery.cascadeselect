$.fn.cascadeselector = function(options){
	var targets = $(this);              //ids of the select eg. $('#province,#city,#county')
	var selected = options['selected']; //selected options(by value), eg. 'a,b,c'
	var data = options['data'];         //data source (json)
	var keys = options['keys'];         //keys of each level
	var valuekey = options['valuekey']; //key of value to get from the data source
	var labelkey = options['labelkey']; //key of label to get from the data source
	var tip = options['tip'];           //tip message for select
	var $l1select = null,
		$l2select = null,
		$l3select = null;
	var l1key = null,
		l2key = null,
		l3key = null;

	function init() {
		if (targets.length == 2) {
			$l1select = $(targets.eq(0));
			$l2select = $(targets.eq(1));
			$l1select.on('change',l1Changed);
			$l2select.on('change',l2Changed);
			if(keys){
				var tmpkeys = keys.split(',');
				l1key = tmpkeys[0];
				l2key = tmpkeys[1];
			}else{

			}

		} else if (targets.length == 3) {
			$l1select = $(targets.eq(0));
			$l2select = $(targets.eq(1));
			$l3select = $(targets.eq(2));
			$l1select.on('change',l1Changed);
			$l2select.on('change',l2Changed);
			$l3select.on('change',l3Changed);
			var tmpkeys = keys.split(',');
			l1key = tmpkeys[0];
			l2key = tmpkeys[1];
			l3key = tmpkeys[2];
		}
		addl1Options();
	}

	function addl1Options() {
		var $l1tip = $l1select.attr('tip');
		console.log($l1tip);
		if($l1tip) $l1select.html("<option value=''>"+$l1tip+"</option>");
		else $l1select.html("<option value=''>"+tip+"</option>");

		var $l2tip = $l2select.attr('tip');
		if($l2tip) $l2select.html("<option value=''>"+$l2tip+"</option>");
		else $l2select.html("<option value=''>"+tip+"</option>");

		if($l3select){
			var $l3tip = $l3select.attr('tip');
			if($l3tip) $l3select.html("<option value=''>"+$l3tip+"</option>");
			else $l3select.html("<option value=''>"+tip+"</option>");
		}
		var l1options = getL1Options();
		$.each( l1options, function(i, n){
			$("<option value='" + n.value + "'>" + n.label + "</option>").appendTo($l1select);
		});
		var selectedvalue = $l1select.attr('selectedvalue');
		if(selectedvalue){
			var $selected = $l1select.find("option[value='"+selectedvalue+"']");
			$selected.attr('selected',true);
			l1Changed();
		}
	}

	function l1Changed() {
		var selectedl1 = $l1select.find('option:selected').val();
		var $l2tip = $l2select.attr('tip');
		$l2select.html("<option value=''>"+$l2tip+"</option>");
		if($l3select){
			var $l3tip = $l3select.attr('tip');
			$l3select.html("<option value=''>"+$l3tip+"</option>");
		}

		var l2options = getL2Options(selectedl1)
		$.each( l2options, function(i, n){
			$("<option value='" + n.value + "'>" + n.label + "</option>").appendTo($l2select);
		});
		var selected = $l2select.attr('selectedvalue');
		if(selected){
			$l2select.find("option[value='"+selected+"']").attr('selected',true);
			l2Changed();
		}
	}
	function l2Changed() {
		var selectedl1 = $l1select.find('option:selected').val();
		var selectedl2 = $l2select.find('option:selected').val();
		if(!$l3select) return;
			var $l3tip = $l3select.attr('tip');
		if($l3tip){
			$l3select.html("<option value=''>"+$l3tip+"</option>");
		}else{
			$l3select.html("<option value=''>"+tip+"</option>");
		}


		var l3options = getL3Options(selectedl1,selectedl2)
		$.each( l3options, function(i, n){
			$("<option value='" + n.value + "'>" + n.label + "</option>").appendTo($l3select);
		});
		var selected = $l3select.attr('selectedvalue');
		if(selected){
			$l3select.find("option[value='"+selected+"']").attr('selected',true);
			l3Changed();
		}
	}

	function l3Changed() {}

	function getL1Options() {
		var l1array = [];
		if(l1key){
			for (var i = 0; i < data[l1key].length; i++) {
				var tmp = data[l1key][i];
				l1array[i] = {
					value:tmp[valuekey], label:tmp[labelkey]
				};
			}
		}else{
			var i = 0;
			for (prop in data){
				l1array[i++] = {
					value:prop, label:prop
				};
			}
		}

		return l1array;
	}

	function getL2Options(l1value) {
		if(l1key && l2key){
			for (var i = 0; i < data[l1key].length; i++) {
				var tmp = data[l1key][i];
				if (tmp[valuekey] == l1value) {
					var tmpl2 = tmp[l2key];
					var l2array = [];
					for (var j = 0; j < tmpl2.length; j++) {
						l2array[j] = {
							value:tmpl2[j][valuekey],
							label:tmpl2[j][labelkey]
						};
					}
					return l2array;
				}
			}
		}else{
			for(prop in data){
				if(l1value != prop) continue;
				var l2array = [];
				for (var j = 0; j < data[prop].length; j++) {
					l2array[j] = {
						value:data[prop][j],
						label:data[prop][j]
					};
				}
				return l2array;
			}
		}

		return [];
	}

	function getL3Options(l1value,l2value) {
		if(l1key && l2key && l3key) {
			for (var i = 0; i < data[l1key].length; i++) {
				var l1 = data[l1key][i];
				if (l1[valuekey] != l1value) continue;
				for (var j = 0; j < l1[l2key].length; j++) {
					var l2 = l1[l2key][j];
					if (l2[valuekey] == l2value) {
						var l3s = l2[l3key];
						var l3array = [];
						for (var k = 0; k < l3s.length; k++) {
							l3array[k] = {
								value: l3s[k][valuekey],
								label: l3s[k][labelkey]
							};
						}
						return l3array;
					}
				}
			}
		}else{
			for(prop in data){
				if(l1value != prop) continue;
				for(prop2 in data[prop]){
					if(l2value != prop2) continue;
					var l3array = [];
					for (var j = 0; j < data[prop][prop2].length; j++) {
						l3array[j] = {
							value:data[prop][prop2][j],
							label:data[prop][prop2][j]
						};
					}
					return l3array;
				}

			}
		}
	}

	init();

};