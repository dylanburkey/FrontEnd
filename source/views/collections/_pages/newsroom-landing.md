---
layout: default
title: "Newsroom Landing"
---


{% include component/section.html 
	component="banner"
	data="newsroom" %}

{% include component/section.html
	component="breadcrumbs" 
	data="newsroom" %}

{% include component/section.html
	columns="4"
	rows="1"
	component="cards"
	style="article-grid"
	data="latest-news"
	title="Latest News"
	button=true
	btn-style= "tertiary"
	btn-title="view all"
	region-selector=true %}

{% include component/section.html 
	component="banner-speedbump"
    data="newsroom" %}

{% include component/section.html
	columns="2"
	rows="1"
	component="date-list"
	data="newsroom" %}

{% include component/section.html
	columns="4"
	rows="1"
	component="cards"
	style="image-hover"
	data="media-resources"
	title="Media Resources" %}

{% include component/section.html
	columns="3"
	rows="1"
	multi-style="true"
	component="cards"
	style="contact,content,call-to-action"
	styleIndex="0,0,0"
	data="newsroom" %}
