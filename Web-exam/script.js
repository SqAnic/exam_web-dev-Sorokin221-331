let listRoutesRequest = new XMLHttpRequest();
let response;

const recordsPerPage = 3;
let totalRecords;
let totalPages;

function paginationCreate(currentPage) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const maxPageButtons = 5;
    let startPage, endPage;

    if (totalPages <= maxPageButtons) {
        // Всего страниц меньше, чем максимальное количество кнопок
        startPage = 1;
        endPage = totalPages;
    } else {
        // Больше страниц, чем максимальное количество кнопок
        const maxPagesBeforeCurrentPage = Math.floor(maxPageButtons / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPageButtons / 2) - 1;

        if (currentPage <= maxPagesBeforeCurrentPage) {
            // Начальные страницы
            startPage = 1;
            endPage = maxPageButtons;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // Конечные страницы
            startPage = totalPages - maxPageButtons + 1;
            endPage = totalPages;
        } else {
            // Средние страницы
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }
    // Создание кнопок пагинации
    for (let buttonNum = startPage; buttonNum <= endPage; buttonNum++) {
        let btn = document.createElement('button');
        btn.innerText = buttonNum;

        if (buttonNum === currentPage) {
            btn.classList.add('active'); 
        }

        btn.addEventListener('click', function() {
            showPage(buttonNum);
            paginationCreate(buttonNum);
        });
        paginationContainer.appendChild(btn);
    }
}



function showPage(pageNumber) {
    var start = (pageNumber - 1) * recordsPerPage;
    var end = start + recordsPerPage;
    var paginatedItems = response.slice(start, end);

    var tableOfRoutes = document.querySelector(".OfRouts tbody");
    tableOfRoutes.innerHTML = '';

    paginatedItems.forEach(function(item) {
        let newRow = tableOfRoutes.insertRow();

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        cell1.innerHTML = item.name;
        cell2.innerHTML = item.description;
        cell3.innerHTML = item.mainObject;

        let selectButton = document.createElement('button');
        selectButton.innerHTML = 'Выбрать';
        selectButton.className = 'btn btn-primary align-';

        cell4.appendChild(selectButton);
    });
}

listRoutesRequest.onreadystatechange = function () {
    if (listRoutesRequest.readyState == 4 && listRoutesRequest.status == 200) {
        response = JSON.parse(listRoutesRequest.responseText);
        totalRecords = response.length;
        totalPages = Math.ceil(totalRecords / recordsPerPage); //Количество страниц в пагинации

        paginationCreate(1);
        showPage(1); 
    }
};

window.onload = function () {
    listRoutesRequest.open('GET', 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=a0694359-be49-42ff-9ac9-9670c5a15112', true);
    listRoutesRequest.send();
};
