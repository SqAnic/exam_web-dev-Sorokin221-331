let response;
let responseGuides, responseRoutes;
let flag, flagChange = false;
let name
let nameOfRout = document.querySelector(".nameOfRout");
let buttonSearch = document.querySelector(".search-btn");
let selectElement = document.querySelector(".languageSelect");
let workExperience1 = document.querySelector(".workExperience1")
let workExperience2 = document.querySelector(".workExperience2")
let nameForm = document.querySelector(".nameForm");
let routeForm = document.querySelector(".routeForm");

const recordsPerPage = 3;
let totalRecords;
let totalPages;

function paganationCreater(flag, startPage, endPage, currentPage) {
    
    let paginationContainer;

    if (flag == 1) {
        paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';
    }

    if (flag == 2) {
        paginationContainer = document.querySelector('.pagination-guides');
        paginationContainer.innerHTML = '';
    }

    for (let buttonNum = startPage; buttonNum <= endPage; buttonNum++) {
        let btn = document.createElement('button');
        btn.innerText = buttonNum;

        if (buttonNum === currentPage) {
            btn.classList.add('active'); 
        }

        btn.addEventListener('click', function() {
            showPage(flag, buttonNum);
            paginationChecker(flag, buttonNum);
        });

        paginationContainer.appendChild(btn);
    }
}

function paginationChecker(flag, currentPage) {

    const maxPageButtons = 5;
    let startPage, endPage;
        
    if (currentPage <= 2) {
        // Начальные страницы
        startPage = 1;
        endPage = maxPageButtons;
    } else if (currentPage + 2 >= totalPages) {
        // Конечные страницы
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
    } else {
        // Средние страницы
        startPage = currentPage - 2;
        endPage = currentPage + 2;
    }
 
    paganationCreater(flag, startPage, endPage, currentPage);
}


function showPage(flag, currentPage) {
    let start = (currentPage - 1) * recordsPerPage;
    let end = start + recordsPerPage;
    let paginatedItems;
    let tableOfRoutes;

    if (flag == 1)
    {
        paginatedItems = responseRoutes.slice(start, end);
        tableOfRoutes = document.querySelector(".ofRouts tbody");
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

            selectButton.addEventListener('click', function() {
                nameOfRout.innerHTML = '';
                nameOfRout.innerHTML = item.name;
                routeForm.innerHTML = item.name 
                let id_route = item.id;
                sendRequest(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${id_route}/guides?api_key=a0694359-be49-42ff-9ac9-9670c5a15112`, GuidesResponse);
        });
    });
    }

    if (flag == 2)
    {
        tableOfGuides = document.querySelector(".ofGuides tbody");
        tableOfGuides.innerHTML = '';
        let nameOfRout = document.querySelector(".nameOfRout");
        let languageSet = new Set();

        if (responseGuides.length > 1) {
            responseGuides.forEach(function(item) {
            let newRow = tableOfGuides.insertRow();
    
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            let cell6 = newRow.insertCell(5);
    
            cell1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16"><path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>';
            cell2.innerHTML = item.name;
            cell3.innerHTML = item.language;
            languageSet.add(item.language);
            cell4.innerHTML = item.workExperience;
            cell5.innerHTML = item.pricePerHour;
    
            let selectButton = document.createElement('button');
            selectButton.type = 'button';
            selectButton.className = 'btn btn-success';
            selectButton.dataset.bsToggle = 'modal';
            selectButton.dataset.bsTarget = '#staticBackdrop';
            selectButton.textContent = 'Выбрать';
            cell6.appendChild(selectButton);
            
            selectButton.addEventListener('click', function() {
                nameForm.innerHTML = item.name;
            });

            });
        }
        else {
            let newRow = tableOfRoutes.insertRow();

            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);

            cell1.innerHTML = responseGuides.name;
            cell2.innerHTML = responseGuides.language;
            languageSet.add(responseGuides.language);
            cell3.innerHTML = responseGuides.workExperience;
            cell4.innerHTML = responseGuides.pricePerHour;

            let selectButton = document.createElement('button');
            selectButton.innerHTML = 'Выбрать';
            selectButton.className = 'btn btn-primary align-';
            cell5.appendChild(selectButton);
        }

        languageSet.forEach(function (language) {
            let optionElement = document.createElement('option');
            optionElement.value = language;
            optionElement.text = language;
            selectElement.appendChild(optionElement);
        });

    }
}

function RoutesResponse(response) {
    flag = 1
    totalPages = Math.ceil(response.length / recordsPerPage); //Количество страниц в пагинации
    responseRoutes = response;
    paginationChecker(flag,1);
    showPage(flag,1); 
}

function GuidesResponse(response) {
    responseGuides = response;
    flag = 2
    showPage(flag,1); 
}

function sendRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

buttonSearch.addEventListener('click', function() {
    let searchField = document.querySelector(".search-field"); 
    let searchQuery = searchField.value;
    console.log(searchQuery.trim() > 0);
    if (searchQuery.trim().length > 0) {
        let table = document.querySelector('.ofRouts');
        let rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            let cells = rows[i].getElementsByTagName('td');


            if (cells[0].textContent == searchQuery) {

            } else {
                rows[i].style.display = 'none';
            }
        } 
    }
});

function extraGuideTableCreater(item) {
    let newRow = tableOfGuides.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);

    cell1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16"><path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>';
    cell2.innerHTML = item.name;
    cell3.innerHTML = item.language;
    cell4.innerHTML = item.workExperience;
    cell5.innerHTML = item.pricePerHour;

    let selectButton = document.createElement('button');
    selectButton.innerHTML = 'Выбрать';
    selectButton.className = 'btn btn-primary align-';
    cell6.appendChild(selectButton);
    flagChange = true;
}

function filterAndDisplayGuides() {
    const selectedLanguage = selectElement.value; // Получение выбранного языка
    const minExperience = workExperience1.value ? parseInt(workExperience1.value, 10) : 0; // Минимальный опыт работы
    const maxExperience = workExperience2.value ? parseInt(workExperience2.value, 10) : Number.MAX_SAFE_INTEGER; // Максимальный опыт работы

    tableOfGuides.innerHTML = ''; // Очистка таблицы

    responseGuides.forEach(function(guide) {
        const guideLanguage = guide.language === selectedLanguage || selectedLanguage === 'Не выбрано'; // Соответствие языку
        const guideExperience = guide.workExperience >= minExperience && guide.workExperience <= maxExperience; // Соответствие опыту работы

        if (guideLanguage && guideExperience) {
            // Добавление строки в таблицу
            extraGuideTableCreater(guide);
        }
    });
}

// События изменения для фильтров
selectElement.addEventListener('change', filterAndDisplayGuides);
workExperience1.addEventListener('change', filterAndDisplayGuides);
workExperience2.addEventListener('change', filterAndDisplayGuides);


window.onload = function () {
    sendRequest('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=a0694359-be49-42ff-9ac9-9670c5a15112', RoutesResponse);
};

