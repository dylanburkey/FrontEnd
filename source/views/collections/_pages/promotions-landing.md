---
layout: default
title: "Promotions Landing"
---

{% include component/section.html 
	component="banner"
	data="promotions-landing" %}
	
{% include component/section.html
	columns="4"
	rows="2"
	component="cards"
	style="promo-grid"
	data="current-offers"
	title="Current Offers" %}
