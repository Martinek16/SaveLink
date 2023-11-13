document.addEventListener("DOMContentLoaded", () => {
  const savePageBtn = document.getElementById('savePageBtn');
  const messageDiv = document.getElementById('message');
  const openLinksBtn = document.getElementById('openLinksBtn');

  savePageBtn.addEventListener('click', () => {
    const selectedCategory = getSelectedCategory();
    if (selectedCategory) {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        const activeTab = tabs[0];
        savePage(activeTab.url, activeTab.title, selectedCategory);
      });
    } else {
      messageDiv.textContent = 'Please select a category before saving!';
    }
  });

  openLinksBtn.addEventListener('click', () => {
    const linksPageURL = chrome.runtime.getURL('links.html');
    window.open(linksPageURL, '_blank');
  });

  function getSelectedCategory() {
    const checkboxes = document.getElementsByName('categoryCheckbox');
    return Array.from(checkboxes).find(checkbox => checkbox.checked)?.value || null;
  }

  function savePage(url, title, category) {
    const savedPages = JSON.parse(localStorage.getItem('savedPages')) || [];
    if (!savedPages.some(page => page.url === url)) {
      const currentDate = new Date().toISOString();  // Dodajanje trenutnega datuma
      savedPages.push({ url, title, category, savedDate: currentDate });  // Shranjevanje z datumom
      localStorage.setItem('savedPages', JSON.stringify(savedPages));
      messageDiv.textContent = 'Saved!';
    } else {
      messageDiv.textContent = 'The page has already been saved!';
    }
  }
});
