# jquery.cascadeselect

## Usage:

```html
<script type='text/javascript'>
$(function() {
	$('#province,#city,#district').cascadeselector({
		selected: '',
		data: provinceAndCityData,
		keys: 'province,city,area',
		valuekey : 'code',
		labelkey : 'name',
		tip: '请选择'
	});
});
</script>

<select id="province"></select>
<select id="city"></select>
<select id="district"></select>
```
