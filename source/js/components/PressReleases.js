import { ADAPT_SEARCH_API_RESPONSE } from "./faceted-browse/APIAdapter";
import { CALL_API } from '../util/APIUtils';
import { INIT_CONTAINER} from "./FacetedBrowse";

//created the Press Release Container
const pressReleasesBrowseContainer = document.getElementById('press-releases');
// search request fetch config to pass auth cookie
const INCLUDE_REQ_CREDENTIALS = {
  credentials: 'include'
};
// the credentials for authentication
const AUTH_DATA = {
  "domain": "sitecore",
  "username": "itemwebapi",
  "password": "RxZ(k(Np#c6vG3+B"
};

const INIT = async () => {
  // search items API endpoint
  const facetedBrowseResultsUrl = pressReleasesBrowseContainer.getAttribute('data-search-endpoint');

  const searchResponseAsJSON = await SEARCH_PRESS_RELEASES(facetedBrowseResultsUrl);
  let adaptedAPIResponse = await ADAPT_SEARCH_API_RESPONSE(searchResponseAsJSON);

  const showDropdownConfig = {
    label: 'Show',
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

  const searchPressConfig = {
    title:'Search Press Releases',
    placeholder:'Search',
    submit:'Submit'
  };

  const regionSortBy = {
    label: 'Region',
    items: [
      {
        text: 'US',
        selected: true
      },
      {
        text: 'CA'
      },
      {
        text: 'VE'
      },
      {
        text: 'UK'
      }
    ]
  };

  const containerViewType = pressReleasesBrowseContainer.getAttribute('data-view-type');
  //calling the init container function with renders and binds data for faceted browse
  INIT_CONTAINER(containerViewType, adaptedAPIResponse, false, showDropdownConfig, searchPressConfig, regionSortBy)
};

const SEARCH_PRESS_RELEASES = async (itemSearchUrl) => {
  //created the api call to retrieve the search response
  let searchResponse = await CALL_API(itemSearchUrl, INCLUDE_REQ_CREDENTIALS);

  // if search request is forbidden (403), then we make the api call for authentication
  // and re-search
  if (searchResponse.status === 403) {
    const facetedBrowseDataAuth = pressReleasesBrowseContainer.getAttribute('data-auth-endpoint');
    const authResponse = await CALL_API(facetedBrowseDataAuth, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(AUTH_DATA)
    });

    // if authReponse exists and it returns 200 Ok then make the call to search items
    if (authResponse && authResponse.ok) {
      searchResponse = await CALL_API(itemSearchUrl, INCLUDE_REQ_CREDENTIALS, true);
    }
  } else if (!searchResponse || !searchResponse.ok) {
    // authentication was not an issue, search failed for other reason
    return undefined;
  }

  return await searchResponse.json();
}

//if Press Release Container exists call the init function
if (pressReleasesBrowseContainer) {
  INIT();
  //add event listener for url to reexecute init every time the url parameters for filtering are modified
  //listen when the url is modified
}