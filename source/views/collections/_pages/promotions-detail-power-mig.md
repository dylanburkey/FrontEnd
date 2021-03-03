---
layout: default
title: "Promotions Detail - Power Mig"
id: "power-mig"
---

{% include component/section.html 
	component="hero" 
	data="power-mig" %}

{% include 
	component/breadcrumbs.html 
	data="power-mig" %}

{% include component/section.html
	component="content-split"
	data="power-mig-more-machine" %}

{% include component/section.html
    component="cards" 
	style="product-grid"
    rows="1"
    columns="3"
    data="power-mig-product-offerings"
    title="Product Offerings" %}

{% include component/section.html
	columns="4"
	rows="1"
	component="cards"
	style="icon"
	data="power-mig-multi-process"
	title="Multi-Process"
	header-centered="true" %}

{% include component/section.html
	columns="3"
	rows="1"
	component="cards"
	style="icon"
	data="power-mig-advanced-features"
	title="Advanced Features"
	header-centered="true" %}