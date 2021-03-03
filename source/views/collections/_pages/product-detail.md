---
layout: default
title: "Product Detail"
---

{% include component/section.html
	component="breadcrumbs" 
	data="viking-3350" %}

{% include component/section.html
	component="hero-product"
    data="viking-3350" %}
    
{% include component/sticky-navigation.html %}

{% include component/section.html
	collapsable="true"
	pdp-section="true"
	id="details"
	sticky-navigation-item="true"
    component="overview"
    data="viking-3350-overview"
    title="Details" %}

{% include component/section.html
	collapsable="true"
    pdp-section="true"
    id="you-may-also-need"
	sticky-navigation-item="true"
	columns="4"
	rows="1"
	component="cards"
	style="product-grid"
	data="viking-3350-you-may-also-need"
	title="You May Also Need" 
	cta="true" 
	btn-style= "tertiary"
	btn-title="view all"
	btn-url="!#view-all" %}

{% include component/section.html
	collapsable="true"
    pdp-section="true"
    id="specifications"
	sticky-navigation-item="true"
    component="table"
    rows="1"
    columns="1"
    data="pdp-authenticated"
    disclaimer="true"
    title="Specifications" %}

{% include component/section.html
	collapsable="true"
    pdp-section="true"
    id="specifications"
	sticky-navigation-item="true"
    component="table"
    rows="1"
    columns="1"
    data="pdp-consumables"
    disclaimer="true"
    title="Consumables" %}
    
{% include component/section.html
    collapsable="true"
    id="popular filler metals"
    sticky-navigation-item="true"
    columns="4"
    rows="1"
    component="cards"
    style="product-grid"
    data="precision-tig-popular-filler-metal"
    title="Popular Filler Metals" 
    cta="true" 
    btn-style= "tertiary"
    btn-title="view all"
    btn-url="!#view-all" %}

{% include component/add-to-cart-modal.html %}