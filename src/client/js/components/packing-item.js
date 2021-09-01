/* Example of a Packing List Item
<div class="packing-item">
  <input class="hide-element" type="checkbox" id="Toothpaste">
  <label class="item-name" for="Toothpaste">Toothpaste</label>
  <label class="item-selector" for="Toothpaste">
    <i class="far fa-circle radio"></i>
    <i class="fas fa-check tick hide-element"></i>
  </label>
</div> */


export default (item = {}) => {
  let listItem = document.createElement('div'); listItem.classList.add('packing-item');

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = item.id;
  checkbox.classList.add('hide-element');

  let itemName = document.createElement('label');
  itemName.htmlFor = checkbox.id;
  itemName.textContent = item.name;
  itemName.classList.add('item-name');

  let itemSelector = document.createElement('label');
  itemSelector.htmlFor = checkbox.id;
  itemSelector.classList.add('item-selector');

  let radioIcon = document.createElement('i');
  radioIcon.classList.add('far', 'fa-circle', 'radio');
  let tickIcon = document.createElement('i');
  tickIcon.classList.add('fas', 'fa-check', 'tick');

  itemSelector.appendChild(radioIcon);
  itemSelector.appendChild(tickIcon);
  listItem.appendChild(checkbox);
  listItem.appendChild(itemName);
  listItem.appendChild(itemSelector);

  return listItem;
}
