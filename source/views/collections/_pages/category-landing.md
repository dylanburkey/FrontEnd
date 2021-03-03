---
layout: default
title: "Category Landing"
---

{% include component/section.html 
	component="banner"
	data="dark" %}

{% include component/section.html
	component="breadcrumbs" 
	data="welding-equipment" %}

{% include component/section.html
	component="content-split"
	data="welding-equipment" %}

{% include component/section.html
	component="cards"
	style="product-grid"
	columns="4"
	rows="1"
	data="homepage-featured-products"
	title="New & Featured Equipment" %}

{% include component/section.html
	component="content-split" 
	data="welding-equipment-crosslinc" %}
	
{% include component/section.html
	component="cards"
	style="image-hover"
	rows="3"
	columns="4"
	data="welding-equipment-categories"
	title="Product Categories" %}

{% include component/section.html
	component="hero" 
	data="welding-equipment-product-spotlight" %}

{% include component/section.html
	component="tiles" 
	style="navigation"
	columns="3"
	rows="1"
	data="welding-equipment-product-offerings"
	title="You May Also Be Interested In" %}
	
