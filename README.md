# jquery.cascadeselect

级联下拉选择框，可以用于多级地区选择等情况
* 数据独立存放，对数据没有要求，只需要是json格式
* 不依赖外部样式，也不添加任何css
* 默认值、回填简便，只需要在对应的select上加一个 selectedvalue 属性
* 自定义option的value和label获取方式
* 代码简单，如果有更复杂的需求也很容易扩展
* 实在是没找到好用的多级地区选择代码，没办法只能再写一个

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
