document.addEventListener("DOMContentLoaded", function () {
  showSavedLinks();
});

function showSavedLinks() {
  var savedPages = JSON.parse(localStorage.getItem("savedPages")) || [];
  var linksContainer = document.getElementById("linksContainer");
  linksContainer.innerHTML = "";

  // Group saved links by categories
  var groupedLinks = {};
  for (var i = 0; i < savedPages.length; i++) {
      var page = savedPages[i];
      var category = page.category || "Uncategorized"; // Set default category as "Uncategorized" if no category is provided
      if (!groupedLinks[category]) {
          groupedLinks[category] = [];
      }
      groupedLinks[category].push(page);
  }

  for (var category in groupedLinks) {
      var categoryHeading = document.createElement("h2");
      categoryHeading.textContent = category;

      var linksList = document.createElement("ul");
      var linksInCategory = groupedLinks[category];
      for (var j = 0; j < linksInCategory.length; j++) {
          var link = linksInCategory[j];
          var listItem = document.createElement("li");
          var card = document.createElement("div"); // Create a card element
          card.className = "card"; // Add the "card" class to the card element

          var anchor = document.createElement("a");
          anchor.href = link.url;
          anchor.target = "_blank"; // Set the target attribute to "_blank"
          anchor.textContent = link.title;

          var ellipsisIcon = document.createElement("i"); // Create the <i> element for the ellipsis icon
          ellipsisIcon.className = "fa-solid fa-ellipsis"; // Set the classes for the Font Awesome ellipsis icon

          card.appendChild(anchor); // Append the anchor to the card element
          card.appendChild(ellipsisIcon); // Append the ellipsis icon to the card element
          listItem.appendChild(card); // Append the card to the list item
          linksList.appendChild(listItem);
      }

      var categoryColumn = document.createElement("div");
      categoryColumn.className = "category-column";
      categoryColumn.appendChild(categoryHeading);
      categoryColumn.appendChild(linksList);
      linksContainer.appendChild(categoryColumn);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showSavedLinks();
  setupIconClick();
});

function setupIconClick() {
  var cards = document.querySelectorAll(".card"); // Select all card elements directly

  var modal = document.getElementById("myModal");
  var modalTitleInput = document.getElementById("modalTitle");
  var modalUrlInput = document.getElementById("modalUrl");

  cards.forEach(function (card) {
    var icon = card.querySelector("i.fa-ellipsis"); // Find the ellipsis icon within the card
    card.addEventListener("click", function () {
      var savedPages = JSON.parse(localStorage.getItem("savedPages")) || [];
      var cardTitle = card.querySelector("a").textContent; // Get the title of the clicked card

      // Find the corresponding data in the savedPages array based on the title
      var clickedCardData = savedPages.find(function (page) {
        return page.title === cardTitle;
      });

      if (clickedCardData) {
        // Set the input fields with the data from the clicked card
        modalTitleInput.value = clickedCardData.title;
        modalUrlInput.value = clickedCardData.url;

        modal.style.display = "flex";
      }
    });
  });

  // Close the modal when clicking outside the content area
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}