const area  = document.getElementById(`area`);
const table = document.createElement(`table`);


function hexString(num) {
  if (num < 16) {
    return `0${num.toString(16)}`;
  }
  return `${num.toString(16)}`;
}

function createTD(r, g, b) {
  let td = document.createElement(`td`);
  td.style.width = `50px`;
  let colorString = `${hexString(r)}${hexString(g)}${hexString(b)}`;
  td.style.backgroundColor = `#${colorString}`;
  td.style.fontSize = `80%`;
  td.style.fontWeight = `bold`;
  td.style.padding = `0px 14px`;
  td.style.color = (r+g+b) <= 382 ? `white` : `black`;
  td.innerText = colorString;

  return td;
}

let tr = document.createElement(`tr`);
for (let b = 0; b <= 256; b += 51) {
  for (let g = 0; g <= 256; g += 51) {
    for (let r = 0; r <= 256; r += 51) {
      let td = createTD(r, g, b);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  tr = document.createElement(`tr`);
  }
  
}

area.appendChild(table);

