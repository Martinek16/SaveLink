document.addEventListener("DOMContentLoaded", function () {
    var savePageBtn = document.getElementById("savePageBtn");
    savePageBtn.addEventListener("click", function () {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        var pageUrl = activeTab.url;
        var pageTitle = activeTab.title;
        savePage(pageUrl, pageTitle);
      });
    });
  
    var openLinksBtn = document.getElementById("openLinksBtn");
    openLinksBtn.addEventListener("click", function () {
      openLinksPage();
    });
  
    function savePage(url, title) {
      var savedPages = JSON.parse(localStorage.getItem("savedPages")) || [];
      var isPageSaved = savedPages.some(function (page) {
        return page.url === url;
      });
  
      if (!isPageSaved) {
        savedPages.push({ url: url, title: title });
        localStorage.setItem("savedPages", JSON.stringify(savedPages));
  
        var messageDiv = document.getElementById("message");
        messageDiv.textContent = "Stran je shranjena!";
      } else {
        var messageDiv = document.getElementById("message");
        messageDiv.textContent = "Stran je že shranjena!";
      }
    }
  
    function openLinksPage() {
      var savedPages = JSON.parse(localStorage.getItem("savedPages")) || [];
      var linksPageContent = "<h1>Shranjene povezave:</h1><ul>";
  
      for (var i = 0; i < savedPages.length; i++) {
        var page = savedPages[i];
        linksPageContent += '<li><a href="' + page.url + '">' + page.title + '</a></li>';
      }
  
      linksPageContent += "</ul>";
  
      var linksPage = window.open("", "_blank");
      linksPage.document.write(linksPageContent);
    }
  });
  