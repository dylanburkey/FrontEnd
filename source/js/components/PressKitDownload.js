if (document.querySelectorAll('[data-action="press-kit-download"]').length) {
  for (const button of document.querySelectorAll('[data-action="press-kit-download"]')) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      let fileName = e.target.getAttribute("data-file-name");
      let fileDownloadURL = e.target.getAttribute("data-file-download-url");
      if (fileName && fileDownloadURL) {
        let formstackForm = `<div id="iFrameWrapper"><div id="ffDialog"></div><div id="ffLookupDialog"></div><iframe frameborder="0" scrolling="no" name="ffEmbedFrame" id="ffEmbedFrame"></iframe>
        <script type="text/javascript">
        function FFSetIframeSize(t,e){var n=document.getElementById("ffEmbedFrame");n.height=t,n.width=e}
        var i=document.getElementById("ffEmbedFrame");
        i=i.contentWindow?i.contentWindow:i.contentDocument.document?i.contentDocument.document:i.contentDocument,i.document.open(),i.document.write('<input id="hiddenFileName" value="${fileName}" type="hidden"/><input id="hiddenFileDownloadURL" value="${fileDownloadURL}" type="hidden"/><script type="text/javascript" id="jsFastForms" src="https://sfapi-sandbox.formstack.io/FormEngine/Scripts/Main.js?d=1ZCX5t6U4RuxqWEvYJWrap0Z0zyLNNdpNE-Bu5bz4lCGYhY_yp3fo0-OpDaSuSun"></' + 'script>'),i.document.close();</script></div>`
        openModal(formstackForm);
      }
    })
  }

  function openModal(data) {

    let modal = document.createElement('div');
    modal.classList.add('modal', 'modal--press-kit-download', 'active');

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = data;

    let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = 'Close<span class="icon-close"></span>';
    modalClose.addEventListener('click', closeModal);

    let overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    modal.appendChild(modalClose);
    modal.appendChild(modalContent);

    document.querySelector('body').classList.add('active-modal');
    document.querySelector('body').appendChild(overlay);
    document.querySelector('body').appendChild(modal);
    
    //fire the Formstack form
    eval(document.getElementById('iFrameWrapper').querySelector("script").text);

  }

  function closeModal() {
    document.querySelectorAll('.modal, .modal-overlay').forEach(i => i.remove());
    document.querySelector('body').classList.remove('active-modal');
  }
}