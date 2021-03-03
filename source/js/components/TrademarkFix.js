
// Font family Public Sans does not display the TM symbol™ correctly
// The solution is to wrap every ™ in a <span> and give that span a font family of Noto Sans. 
window.addEventListener('load', ()=> {
  replaceOnDocument("™","<span style='font-family: Noto Sans, sans-serif; font-weight: inherit;'>™</span>");
})

const replaceOnDocument = (pattern, string) => {
  let target = document.body.querySelectorAll("*:not(script):not(noscript):not(style)")
  target.forEach(({childNodes: [...nodes]}) => nodes
    .filter(({nodeType}) => nodeType === document.ELEMENT_NODE)
    .forEach((elementNode) => {
      if (elementNode.innerText.includes(pattern) && elementNode.childNodes.length === 1 ){
        elementNode.innerHTML = elementNode.innerHTML.replace(pattern, string);
      }
    }
  ));
};