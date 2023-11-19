document.addEventListener("DOMContentLoaded", function () {
  var savePageBtn = document.getElementById("savePageBtn");
  savePageBtn.addEventListener("click", function () {
      var selectedCategory = getSelectedCategory();
      if (selectedCategory) {
          chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
              var activeTab = tabs[0];
              var pageUrl = activeTab.url;
              var pageTitle = activeTab.title;
              savePage(pageUrl, pageTitle, selectedCategory);
          });
      } else {
          var messageDiv = document.getElementById("message");
          messageDiv.textContent = "Please select a category before saving!";
      }
  });

  function getSelectedCategory() {
      var checkboxes = document.getElementsByName("categoryCheckbox");
      for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
              return checkboxes[i].value;
          }
      }
      return null;
  }

  function savePage(url, title, category) {
      var savedPages = JSON.parse(localStorage.getItem("savedPages")) || [];
      var isPageSaved = savedPages.some(function (page) {
          return page.url === url;
      });

      if (!isPageSaved) {
          savedPages.push({ url: url, title: title, category: category });
          localStorage.setItem("savedPages", JSON.stringify(savedPages));

          var messageDiv = document.getElementById("message");
          messageDiv.textContent = "Saved!";
      } else {
          var messageDiv = document.getElementById("message");
          messageDiv.textContent = "The page has already been saved!";
      }
  }

  function openLinksPage() {
      var savedPages = JSON.parse(localStorage.getItem("savedPages")) || [];
      var linksPageContent = "<h1>Saved links:</h1>";

      // Group saved links by categories
      var groupedLinks = {};
      for (var i = 0; i < savedPages.length; i++) {
          var page = savedPages[i];
          if (!groupedLinks[page.category]) {
              groupedLinks[page.category] = [];
          }
          groupedLinks[page.category].push(page);
      }

      for (var category in groupedLinks) {
          linksPageContent += "<h2>" + category + "</h2><ul>";
          var linksInCategory = groupedLinks[category];
          for (var j = 0; j < linksInCategory.length; j++) {
              var link = linksInCategory[j];
              linksPageContent +=
                  '<li><a href="' + link.url + '">' + link.title + '</a></li>';
          }
          linksPageContent += "</ul>";
      }

      var linksPage = window.open("", "_blank");
      linksPage.document.write(linksPageContent);
  }

  var openLinksBtn = document.getElementById("openLinksBtn");
  openLinksBtn.addEventListener("click", function () {
      var linksPageURL = chrome.runtime.getURL("links.html");
      window.open(linksPageURL, "_blank");
  });
});