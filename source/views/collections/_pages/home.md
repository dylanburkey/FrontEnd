---
layout: default
title: "Home"
---

{% include component/section.html 
	component="hero"
	data="homepage-featured" %}

{% include component/section.html 
	component="search-bar"
	data="general" %}

{% include component/section.html
	component="tiles" 
	style="navigation"
	columns="3"
	rows="1"
	data="homepage-product-offerings"
	title="Popular Product Offerings" %}

{% include component/section.html 
	component="content-split"
	data="industry-expertise" %}

{% include component/section.html 
	component="content-split"
	data="training-education" %}

{% include component/section.html
	component="cards" 
	style="product-grid"
	columns="4"
	rows="1"
	data="homepage-featured-products"
	title="Featured Products" %}

{% include component/section.html 
	component="content-split"
	data="new-equipment" %}
	
{% include component/section.html 
	component="content-split"
	data="new-equipment-inline-video" %}

{% include component/section.html 
	component="cards"
	style="content"
	columns="4"
	rows="1"
	data="homepage-whats-trending"
	title="What's Trending" %}

{% include component/section.html 
	component="hero"
	data="welding-equipment-product-spotlight" %}
