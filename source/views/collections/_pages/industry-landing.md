---
layout: default
title: "Industry Landing"
---
	
{% include component/section.html 
	component="banner"
	data="solutions-by-industry" %}

	{% include component/section.html
	component="breadcrumbs" 
	data="solutions-by-industry" %}

{% include component/section.html
	columns="4"
	rows="3"
	component="cards"
	style="image-hover"
	data="industry-cards"
	title="Industries We Serve" %}

{% include component/section.html 
	component="hero"
	data="welding-equipment-product-spotlight" %}