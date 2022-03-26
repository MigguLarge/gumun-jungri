const splits = document.getElementsByClassName('split');
const importants = document.getElementsByClassName('important');
const materials = document.getElementsByClassName('material');
const detailedContents = document.getElementsByClassName('detailed-contents');
const subjects = document.getElementsByClassName('subject');
const main = document.querySelector('.main');
const inputArticle = document.querySelector('.input-article');

const formatArticleButton = document.querySelector('.format-article');
const splitButton = document.querySelector('.split-sentence');
const leftButton = document.querySelector('.left-importants');
const arrangeButton = document.querySelector('.arrange-importants');

// @{}: material
// #{}: detailed contents
// ^{}: subject

const formatArticle = (article) => {
    article = article.replace(/(?:\r\n|\r|\n)/g, '<br>');
    article = article.replaceAll('/', '<span class="split">/</span>');
    article = article.replaceAll('@{', '<span class="important material">');
    article = article.replaceAll(
        '#{',
        '<span class="important detailed-contents">',
    );
    article = article.replaceAll('^{', '<span class="important subject">');
    article = article.replaceAll('}', '</span>');

    return article;
};

const leftImportantsOnly = (articleElement) => {
    articleElement.style.color = 'white';

    for (let i = 0; i < splits.length; i++) {
        splits[i].style.color = 'white';
    }

    for (let i = 0; i < importants.length; i++) {
        importants[i].style.color = 'hsl(11, 86%, 43%)';
    }
};

const arrangeImportants = () => {
    let inner = '';
    let materialList = '';
    let detailedContentsList = '';
    let subjectList = '';

    for (let i = 0; i < importants.length; i++) {
        inner += importants[i].outerHTML;
    }

    for (let i = 0; i < materials.length; i++) {
        materialList += `<li>${materials[i].outerHTML}</li>`;
        materialList = materialList.replaceAll('<br>', '');
    }

    for (let i = 0; i < detailedContents.length; i++) {
        detailedContentsList += `<li>${detailedContents[i].outerHTML}</li>`;
        detailedContentsList = detailedContentsList.replaceAll('<br>', '');
    }

    for (let i = 0; i < subjects.length; i++) {
        subjectList += `<li>${subjects[i].outerHTML}</li>`;
        subjectList = subjectList.replaceAll('<br>', '');
    }

    main.style.color = 'inherit';

    main.innerHTML = `
        <div class="division">
            <div class="division__material">
                <h1>material</h1>
                <ul>
                    ${materialList}
                </ul>
            </div>
            <div class="division__detailed-content">
                <h1>detailed contents</h1>
                <ul>
                    ${detailedContentsList}
                </ul>
            </div>
            <div class="division__subject">
                <h1>subject</h1>
                <ul>
                    ${subjectList}
                </ul>
            </div>
        </div>
    `;
};

const enableSplit = (i) => {
    splits[i].style.opacity = 1;
};

const splitInterval = () => {
    let i = 0;
    const enableSplitInterval = setInterval(() => {
        console.log(i + ', ' + splits.length);
        if (i >= splits.length) {
            i = 0;
            clearInterval(enableSplitInterval);
        } else {
            enableSplit(i);
            i++;
        }
    }, 200);
};

// const splitInterval = () => {
//     for (let i = 0; i < splits.length; i++) {
//         const splitTimeout = setTimeout(() => enableSplit(i), 1000);
//         clearTimeout(splitTimeout);
//     }
// };

inputArticle.value = '';
// main.innerHTML = formatArticle(main.innerHTML);

formatArticleButton.addEventListener('click', () => {
    // inputArticle.value = formatArticle(inputArticle.value);
    main.innerHTML = formatArticle(inputArticle.value);
});

splitButton.addEventListener('click', () => {
    splitInterval();
});

leftButton.addEventListener('click', () => {
    leftImportantsOnly(main);
});

arrangeButton.addEventListener('click', () => {
    arrangeImportants();
});
