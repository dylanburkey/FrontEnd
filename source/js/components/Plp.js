import {ADAPT_API_RESPONSE} from "./faceted-browse/APIAdapter";
import { INIT_CONTAINER, CALLBACK_FUNC } from "./FacetedBrowse";

//variables
const plpBrowseContainer = document.getElementById('plp');

const INIT = async () => {
  const facetedBrowseResultsUrl = plpBrowseContainer.getAttribute('data-search-endpoint');
  const facetedBrowseApiKey = plpBrowseContainer.getAttribute('data-api-key');
  const dataWebCategory = plpBrowseContainer.getAttribute('data-web-category');
  const dataSalesAreas = plpBrowseContainer.getAttribute('data-sales-area');
  // the price I will display will be the first value I find from Sales Areas with SalesAreaSalesOrgCode == dataSalesArea
  const config = {
    method: "POST",
    headers: {
      "api-key":  facetedBrowseApiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "search": "*",
      "count": true,
      "top": 100,
      "facets": facetsConfig.facetsAttributes,
      "filter": `(ProductWebCategory/any(t: t eq '${dataWebCategory}')) or (ItemWebCategory/any(t: t eq '${dataWebCategory}'))`
    })
  };
  const sortBy = {
    title: 'Sort By',
    items: [
      {
        text:'Price(Low-High)',
        selected: true
      },
      {
        text:'Price (High-Low))'
      },
      {
        text:'Relevance'
      },
      {
        text:'New'
      },
      {
        text:'Name (A to Z)'
      },
      {
        text:'Name (Z to A)'
      }
    ]
  };
  const show = {
    items: [
      {
        text: '10 Per Page',
        selected: true
      },
      {
        text: '25 Per Page'
      },
      {
        text: '50 Per Page'
      },
      {
        text: '100 Per Page'
      }
    ]
  };
  const containerViewType = plpBrowseContainer.getAttribute('data-view-type') ? plpBrowseContainer.getAttribute('data-view-type'): 'list';
  let adaptedAPIResponse = await ADAPT_API_RESPONSE(facetedBrowseResultsUrl, config);
  INIT_CONTAINER(containerViewType, adaptedAPIResponse.results, adaptedAPIResponse.facets, sortBy, show, CALLBACK_FUNC)
};

if (plpBrowseContainer) {
  INIT();
  //add event listener for url to reexecute init every time the url parametes for filtering is modified
  //listen when the url is modified
}