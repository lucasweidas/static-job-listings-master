export async function loadAllJobCards() {
  const jobData = await getAllJobs();
  jobData.forEach(createJobCard);
}

function createJobCard(job) {
  const jobItems = [...job.languages, ...job.tools];
  const jobsContainer = document.querySelector('.job-cards');
  const cardTemplate = document.querySelector('#card-template');
  const cardClone = cardTemplate.content.cloneNode(true);
  const card = cardClone.querySelector('.card');
  const logo = card.querySelector('[data-logo]');
  const company = card.querySelector('[data-company]');
  const position = card.querySelector('[data-position]');
  const postedAt = card.querySelector('[data-postedAt]');
  const contract = card.querySelector('[data-contract]');
  const location = card.querySelector('[data-location]');
  const categories = card.querySelector('.card-categories');

  card.dataset.id = job.id;
  logo.src = job.logo;
  logo.alt = job.company;
  company.innerText = job.company;
  position.innerText = job.position;
  postedAt.innerText = job.postedAt;
  contract.innerText = job.contract;
  location.innerText = job.location;

  if (job.new || job.featured) {
    const cardHeader = card.querySelector('.card-header');
    cardHeader.appendChild(addTag(job.new, job.featured));

    const hasFeatured = cardHeader.querySelector('.featured');
    hasFeatured && card.classList.add('highlight');
  }

  categories.append(createCategorieButton(job.role), createCategorieButton(job.level));
  jobItems.forEach(item => categories.appendChild(createCategorieButton(item)));
  jobsContainer.appendChild(cardClone);
}

function addTag(hasNew, hasFeatured) {
  const tagsClone = document.querySelector('#tags-template').content.cloneNode(true);
  const tags = tagsClone.querySelector('.tags');

  if (hasNew && !hasFeatured) {
    const tagFeatured = tags.querySelector('.featured');
    tags.removeChild(tagFeatured);
    return tagsClone;
  }

  if (hasFeatured && !hasNew) {
    const tagNew = tags.querySelector('.new');
    tags.removeChild(tagNew);
    return tagsClone;
  }

  return tagsClone;
}

function createCategorieButton(categorie) {
  const buttonClone = document.querySelector('#categorie-btn-template').content.cloneNode(true);
  const button = buttonClone.querySelector('.categorie-btn');
  const span = button.querySelector('span');

  button.dataset.categorie = categorie;
  span.innerText = categorie;

  return buttonClone;
}

async function getAllJobs() {
  const response = await fetch('./data.json');
  const data = await response.json();
  return data;
}
