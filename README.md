# jquery.cascadeselect

级联下拉选择框：
* 数据单独，替换方便
* 默认值、回填简便，只需要在对应的select上加一个 selectedvalue 属性
* 

## Usage:

```html
<script type='text/javascript'>
$(function() {
	$('#province,#city,#district').cascadeselector({//ids of the select eg. $('#province,#city,#county')
		data: provinceAndCityData, 	//data source (json)
		keys: 'province,city,area',	//keys of each level
		valuekey : 'code',		//key of value to get from the data source
		labelkey : 'name',		//key of label to get from the data source
		tip: '请选择'			//tip message for select
	});
});
</script>

<select id="province"></select>
<select id="city"></select>
<select id="district"></select>
```
