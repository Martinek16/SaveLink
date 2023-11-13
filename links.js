document.addEventListener("DOMContentLoaded", () => {
  showSavedLinks();
  setupModalClose();
  setupSettingsButton();
  initializeCategories();
    displayCategories();
});

function showSavedLinks() {
  const savedPages = JSON.parse(localStorage.getItem('savedPages')) || [];
  const linksContainer = document.getElementById('linksContainer');
  linksContainer.innerHTML = '';

  // Group saved links by categories
  const groupedLinks = savedPages.reduce((acc, page) => {
    const category = page.category || 'Uncategorized';
    acc[category] = acc[category] || [];
    acc[category].push(page);
    return acc;
  }, {});

  for (const category in groupedLinks) {
    const categoryHeading = document.createElement('h2');
    categoryHeading.textContent = category;

    const linksList = document.createElement('ul');
    linksList.style.listStyleType = 'none';

    groupedLinks[category].forEach(link => {
      const listItem = document.createElement('li');
      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true;
      card.addEventListener('dragstart', dragStart);
      card.addEventListener('dragend', dragEnd);

      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.target = '_blank';
      anchor.textContent = link.title;

      const ellipsisIcon = document.createElement('i');
      ellipsisIcon.className = 'fa-solid fa-ellipsis';
      ellipsisIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        showEditModal(link);
      });

      card.appendChild(anchor);
      card.appendChild(ellipsisIcon);
      listItem.appendChild(card);
      linksList.appendChild(listItem);
    });

    const categoryColumn = document.createElement('div');
    categoryColumn.className = 'category-column';
    categoryColumn.appendChild(categoryHeading);
    categoryColumn.appendChild(linksList);
    linksContainer.appendChild(categoryColumn);
    categoryColumn.addEventListener('dragover', dragOver);
    categoryColumn.addEventListener('dragenter', dragEnter);
    categoryColumn.addEventListener('dragleave', dragLeave);
    categoryColumn.addEventListener('drop', dragDrop);
  }
}


function showEditModal(link) {
  const modal = document.getElementById('myModal');
  const modalTitleInput = document.getElementById('modalTitle');
  const modalUrlInput = document.getElementById('modalUrl');

  modalTitleInput.value = link.title;
  modalUrlInput.value = link.url;

  const saveButton = document.getElementById('modalSave');
  const deleteButton = document.getElementById('modalDelete');

  saveButton.onclick = () => updateLink(link, modalTitleInput.value, modalUrlInput.value);
  deleteButton.onclick = () => deleteLink(link);

  modal.style.display = 'flex';
}

function updateLink(originalLink, newTitle, newUrl) {
  const savedPages = JSON.parse(localStorage.getItem('savedPages')) || [];
  const pageIndex = savedPages.findIndex(page => page.url === originalLink.url);
  if (pageIndex !== -1) {
    savedPages[pageIndex] = { ...originalLink, title: newTitle, url: newUrl };
    localStorage.setItem('savedPages', JSON.stringify(savedPages));
    closeEditModal();
    showSavedLinks();
  }
}

function deleteLink(linkToDelete) {
  const savedPages = JSON.parse(localStorage.getItem('savedPages')) || [];
  const updatedPages = savedPages.filter(page => page.url !== linkToDelete.url);
  localStorage.setItem('savedPages', JSON.stringify(updatedPages));
  closeEditModal();
  showSavedLinks();
}

function closeEditModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

function setupModalClose() {
  const modal = document.getElementById('myModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

function setupSettingsButton() {
  const settingsButton = document.querySelector('.settings-btn');
  const settingsModal = document.getElementById('settingsModal');

  settingsButton.onclick = () => settingsModal.style.display = 'flex';
  const closeSettingsButton = document.getElementById('closeSettings');
  closeSettingsButton.onclick = () => settingsModal.style.display = 'none';
}

function displayCategories() {
  const categoriesList = document.getElementById('categoriesList');
  const categories = JSON.parse(localStorage.getItem('categories')) || ['Work', 'Other', 'Fun', 'Uncategorized'];
  categoriesList.innerHTML = categories.map(category => `<div>${category}</div>`).join('');
}

function addNewCategory() {
  const newCategoryName = document.getElementById('newCategoryName').value;
  if (newCategoryName) {
    const categories = JSON.parse(localStorage.getItem('categories')) || ['Work', 'Other', 'Fun', 'Uncategorized'];
    if (!categories.includes(newCategoryName)) {
      categories.push(newCategoryName);
      localStorage.setItem('categories', JSON.stringify(categories));
      displayCategories();
    }
  }
}

// Drag and Drop funkcije
function dragStart() {
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
  // Tukaj dodajte logiko za posodobitev kategorije kartice
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragDrop() {
  const card = document.querySelector('.dragging');
  this.appendChild(card);
  this.classList.remove('over');

  const newCategory = this.querySelector('h2').textContent;
  const linkTitle = card.querySelector('a').textContent;
  updateCategory(linkTitle, newCategory);
}

function updateCategory(title, newCategory) {
  const savedPages = JSON.parse(localStorage.getItem('savedPages')) || [];
  const pageIndex = savedPages.findIndex(page => page.title === title);
  if (pageIndex !== -1) {
    savedPages[pageIndex].category = newCategory;
    localStorage.setItem('savedPages', JSON.stringify(savedPages));
  }
}

function initializeCategories() {
  if (!localStorage.getItem('categories')) {
      const defaultCategories = ['Work', 'Fun', 'Other', 'Uncategorized'];
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
  }
}

function displayCategories() {
  const categories = getCategories();
  const categoriesContainer = document.getElementById('categoriesContainer'); // Predpostavljamo, da imate ta element v HTML
  categoriesContainer.innerHTML = '';

  categories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.textContent = category;
      // Dodajte tukaj elemente za urejanje ali brisanje, če so potrebni
      categoriesContainer.appendChild(categoryElement);
  });

  // Dodajte tukaj funkcionalnost za dodajanje novih kategorij
}

function addNewCategory(categoryName) {
  const categories = getCategories();
  if (categories.indexOf(categoryName) === -1) {
      categories.push(categoryName);
      saveCategories(categories);
      displayCategories(); // Ponovno prikažite kategorije
  } else {
      alert("Category already exists.");
  }
}
