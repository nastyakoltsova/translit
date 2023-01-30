let addWordForm = document.querySelector('.addWord');
addWordForm.addEventListener('submit', (event) => {
    event.preventDefault();
});
let addButton = document.querySelector('.addBtn');
let input = document.querySelector('.inputText');
let deleteButton = document.querySelector('.delete');

let table = document.getElementById('words');


function translit(word) {
    const lettersMapping = {
        'А': 'A', 'а': 'a', 'Б': 'B', 'б': 'b', 'В': 'V', 'в': 'v', 'Г': 'G', 'г': 'g',
        'Д': 'D', 'д': 'd', 'Е': 'E', 'е': 'e', 'Ё': 'YO', 'ё': 'yo', 'Ж': 'ZH', 'ж': 'zh',
        'З': 'Z', 'з': 'z', 'И': 'I', 'и': 'i', 'Й': 'I', 'й': 'i', 'К': 'K', 'к': 'k',
        'Л': 'L', 'л': 'l', 'М': 'M', 'м': 'm', 'Н': 'N', 'н': 'n', 'О': 'O', 'о': 'o',
        'П': 'P', 'п': 'p', 'Р': 'R', 'р': 'r', 'С': 'S', 'с': 's', 'Т': 'T', 'т': 't',
        'У': 'U', 'у': 'u', 'Ф': 'F', 'ф': 'f', 'Х': 'H', 'х': 'h', 'Ц': 'TS', 'ц': 'ts',
        'Ч': 'CH', 'ч': 'ch', 'Ш': 'SH', 'ш': 'sh', 'Щ': 'SHCH', 'щ': 'shch', 'Ъ': '"', 'ъ': '"',
        'Ы': 'Y', 'ы': 'y', 'Ь': "'", 'ь': "'", 'Э': 'E', 'э': 'e', 'Ю': 'YU', 'ю': 'yu', 'Я': 'YA', 'я': 'ya', ' ': ' '
    }

    return word.split('')
        .map((letter) => lettersMapping[letter] ?? letter)
        .reduce((str, char) => str + char);
}

function addWord() {
    const word = input.value;
    console.log('clicked add button');
    addWordsToTable(word, translit(word));
    input.value = '';
}

function addWordsToTable(wordInRussian, transWord) {
    if (wordInRussian.length > 0) {
        const row = document.createElement('tr');
        row.style.cssText = `
        border-top: 1px solid black;
        `;
        row.style.height = "50px";
        let rows = document.getElementsByTagName('tr');
        const rowNum = document.createElement('th');
        rowNum.style.backgroundColor = "rgb(240,240,240)";
        rowNum.innerText = `${rows.length + 1}`
        const rowItemRus = document.createElement('th');
        rowItemRus.className = 'forHint';
        rowItemRus.style.cssText = `
            background-color: rgb(240,240,240);
            border-right: 2px solid black;
            font-weight: lighter;
        `;
        const rowItemEng = document.createElement('th');
        rowItemEng.className = 'forHint';
        rowItemEng.style.cssText = `
            background-color: rgb(217,216,216);
            font-weight: lighter;
        `;
        const rowDel = document.createElement('th');
        rowDel.style.cssText = `
            background-color: rgb(217, 216, 216);
        `;
        let arrImg = [];
        arrImg[0] = new Image();
        arrImg[0].src = '/icons/x.png';
        arrImg[0].className = 'dlBtn';
        arrImg[0].style.cssText = `
            width: 22px;
            margin-right: 16px;
            margin-top: 2px;
        `;
        rowDel.appendChild(arrImg[0]);
        if (wordInRussian.trim().length < 7) {
            rowItemRus.innerText = wordInRussian;
            rowItemEng.innerText = transWord;
        } else {
            rowItemRus.innerText = wordInRussian.slice(0, 6) + '...';
            const span = document.createElement('span');
            span.innerText = wordInRussian;
            span.className = 'span';
            rowItemRus.appendChild(span);

            rowItemEng.innerText = transWord.slice(0, 6) + '...';
            const spanTrans = document.createElement('span');
            spanTrans.innerText = transWord;
            spanTrans.className = 'span';
            rowItemEng.appendChild(spanTrans);
        }
        table.appendChild(row);
        row.appendChild(rowNum);
        row.appendChild(rowItemRus);
        row.appendChild(rowItemEng);
        row.appendChild(rowDel);
    }
}

function deleteAll() {
    let tableSize = document.querySelectorAll('tr');
    for (let i = 1; i <= tableSize.length; i++) {
        tableSize[i].remove();
    }
}

let content = document.getElementById('words');

content.addEventListener('click', (ev) => {
    const allRows = document.querySelectorAll('tr');
    const allDels = document.querySelectorAll('.dlBtn');

    for (let i = 0; i < allRows.length; i++) {
        if (ev.target === allDels[i]) {
            allRows[i + 1].remove();
        }
    }
})

addButton.addEventListener('click', (addWord));
deleteButton.addEventListener('click', (deleteAll));
