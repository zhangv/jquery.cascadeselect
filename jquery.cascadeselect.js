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
			var tmpkeys = keys.split(',');
			l1key = tmpkeys[0];
			l2key = tmpkeys[1];
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
		$l1select.html("<option value=''>"+tip+"</option>");
		$l2select.html("<option value=''>"+tip+"</option>");
		$l3select.html("<option value=''>"+tip+"</option>");
		var l1options = getL1Options();
		$.each( l1options, function(i, n){
			$("<option value='" + n.value + "'>" + n.label + "</option>").appendTo($l1select);
		});
		var selectedvalue = $l1select.attr('selectedvalue');
		if(selectedvalue){
			$l1select.find("option[value='"+selectedvalue+"']").attr('selected',true);
			l1Changed();
		}
	}

	function l1Changed() {
		var selectedl1 = $l1select.find('option:selected').val();
		$l2select.html("<option value=''>"+tip+"</option>");
		$l3select.html("<option value=''>"+tip+"</option>");
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
		var selectedl2 = $l2select.find('option:selected').val();
		$l3select.html("<option value=''>"+tip+"</option>");
		var l3options = getL3Options(selectedl2)
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
		for (var i = 0; i < data[l1key].length; i++) {
			var tmp = data[l1key][i];
			l1array[i] = {
				value:tmp[valuekey],
				label:tmp[labelkey]
			};
		}
		return l1array;
	}

	function getL2Options(l1value) {
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
		return [];
	}

	function getL3Options(l2value) {
		for (var i = 0; i < data[l1key].length; i++) {
			var l1 = data[l1key][i];
			for (var j = 0; j < l1[l2key].length; j++) {
				var l2 = l1[l2key][j];
				if (l2[valuekey] == l2value) {
					var l3s = l2[l3key];
					var l3array = [];
					for (var k = 0; k < l3s.length; k++) {
						l3array[k] = {
							value:l3s[k][valuekey],
							label:l3s[k][labelkey]
						};
					}
					return l3array;
				}
			}
		}
	}

	init();

};