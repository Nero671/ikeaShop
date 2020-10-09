import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

const catalog = () => {
  const updateSubCatalog = generateSubCatalog();
  const btnBurger = document.querySelector('.btn-burger'),
    catalog = document.querySelector('.catalog'),
    subcatalog = document.querySelector('.subcatalog'),
    subcatalogHeader = document.querySelector('.subcatalog-header'),
    btnReturn = document.querySelector('.btn-return');

  const overlay = document.createElement('div');

  overlay.classList.add('overlay');
  document.body.insertAdjacentElement('beforeend', overlay);

  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  }

  const closeMenu = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    closeSubMenu();
  }

  const handlerCatalog = event => {
    event.preventDefault();
    const target = event.target,
      itemList = target.closest('.catalog-list__item');
    if (itemList) {

      getData.subCatalog(target.textContent, (data) => {
         updateSubCatalog(target.textContent, data);
         subcatalog.classList.add('subopen');
      });


     
    };

    if(event.target.classList.contains('btn-close')) {
      closeMenu();
    }
  }

  const closeSubMenu = () => {
    subcatalog.classList.remove('subopen');
  }

  btnBurger.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  catalog.addEventListener('click', handlerCatalog);
  subcatalog.addEventListener('click', (event) => {
    const btnReturn = event.target.closest('.btn-return');

    if(btnReturn) closeSubMenu();
  });
  
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}

export default catalog;