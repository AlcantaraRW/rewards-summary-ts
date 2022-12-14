export function createContainer(parent: Element) {
  const container = document.createElement('div');
  container.setAttribute(
    'style',
    `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      color: inherit;
      font: inherit;
    `
  );

  parent.appendChild(container);
  return container;
}

export function createTable(parent: Element, headers: string[], items: Array<object | string>) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  function createRow(isHeader: boolean = false) {
    const row = document.createElement('tr');

    if (isHeader) {
      row.setAttribute('align', 'left');
      thead.appendChild(row);
    } else {
      tbody.appendChild(row);
    }

    return row;
  }

  function createColumn(parent: Element, content: string, isHeader: boolean = false) {
    const column = document.createElement(isHeader ? 'th' : 'td');
    column.setAttribute('width', '80px');
    column.innerHTML = content;
    parent.appendChild(column);
  }

  const headerRow = createRow(true);

  headers.forEach((header) => {
    createColumn(headerRow, header, true);
  });

  const onlyRow = createRow();

  items.forEach((item) => {
    if (typeof item === 'object') {
      const row = createRow();
      Object.values(item).forEach((value) => createColumn(row, value));
    } else {
      createColumn(onlyRow, item);
    }
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  parent.appendChild(table);
}

export function createStrong(parent: Element, content: string) {
  const strong = document.createElement('strong');
  strong.innerText = content;
  strong.setAttribute('style', 'margin: 10px');
  parent.appendChild(strong);
}

export function createLabel(parent: Element, content: string) {
  const label = document.createElement('label');
  label.innerHTML = content;
  label.setAttribute('style', 'margin: 5px');
  parent.appendChild(label);
}

export function createDivider(parent: Element) {
  const divider = document.createElement('div');
  divider.setAttribute(
    'style',
    `
        margin: 1rem;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #A8A8A8;
        width: 100vh;
      `
  );

  parent.appendChild(divider);
}
