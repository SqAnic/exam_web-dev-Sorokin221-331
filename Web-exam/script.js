let response;
let responseGuides, responseRoutes;
let flag, flagChange = false;
let name
let nameOfRout = document.querySelector(".nameOfRout");
let buttonSearch = document.querySelector(".search-btn");
let selectElement = document.querySelector(".languageSelect");
let workExperience1 = document.querySelector(".workExperience1");
let workExperience2 = document.querySelector(".workExperience2");
let nameForm = document.querySelector(".nameForm");
let routeForm = document.querySelector(".routeForm");
let totalCost = document.querySelector(".totalCost");
let durationForm = document.querySelector(".timeChoice");
let priceForm = document.querySelector(".totalCost");
let option1 = document.querySelector(".option1");
let option2 = document.querySelector(".option2");
let timeForm = document.querySelector(".startTime");
let numberOfPeaple = document.querySelector(".numberOfPeaple");
let pricePerHour, optionOne = 1, optionTwo = 1, isItMorning = 0 ,isItEvening = 0,numberOfVisitors = 0;
let numberHour = 1;

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

function costCalculate(costPerHour, calculateFlag) {
    if (calculateFlag == 1 ){
        pricePerHour = costPerHour;
        console.log(pricePerHour);
    }
    else if (calculateFlag == 2 ){
        numberHour = costPerHour;
        console.log(numberHour);
    }
    else if (calculateFlag == 3 ){
        optionOne = costPerHour;
        console.log(optionOne);
    }
    else if (calculateFlag == 4 ){
        optionTwo = costPerHour;
        console.log(optionTwo);
    }
    else if (calculateFlag == 5 ){
        isItMorning = costPerHour;
        console.log(isItMorning);
    }
    else if (calculateFlag == 6 ){
        isItEvening = costPerHour;
        console.log(isItMorning);
    }
    else if (calculateFlag == 7 ){
        isItMorning = 0;
        isItEvening = 0;
        console.log(isItMorning, isItEvening);
    }
    else if (calculateFlag == 8 ){
        numberOfVisitors = costPerHour;
        console.log(numberOfVisitors);
    }
    else if (calculateFlag == 9 ){
        numberOfVisitors = costPerHour;
        console.log(numberOfVisitors);
    }

    priceForm.innerHTML = '';
    priceForm.innerHTML = Math.floor(pricePerHour * numberHour * optionOne * optionTwo + isItMorning + isItEvening + numberOfVisitors);
}
option1.addEventListener('change', function() {
    if (option1.checked) {
        costCalculate(1.3, 3);
    } else {
        priceForm.innerHTML = Math.floor(pricePerHour * numberHour * optionTwo + isItMorning + isItEvening + numberOfVisitors);
        costCalculate(1, 3);
    }
});


option2.addEventListener('change', function() {
    const input = document.getElementById('excursionDate');
    const date = new Date(input.value);
    const dayOfWeek = date.getDay();

    if (option2.checked && (dayOfWeek === 0 || dayOfWeek === 6)) {
        costCalculate(1.25, 4);
    } 
    else if (option2.checked && dayOfWeek > 0 && dayOfWeek < 6) {
        costCalculate(1.3, 4);
    }
    else {
        priceForm.innerHTML = Math.floor(pricePerHour * numberHour * optionOne + isItMorning + isItEvening + numberOfVisitors);
        costCalculate(1, 4);
    }
});
durationForm.addEventListener('change', function(){
    costCalculate(parseInt(durationForm.value, 10), 2)
});

let timeout;

timeForm.addEventListener('change', function() {
    clearTimeout(timeout); // Отмена предыдущего таймера, если он был установлен

    timeout = setTimeout(function() {
        const selectedTime = timeForm.value; 
        const hours = parseInt(selectedTime.split(":")[0], 10);
        const mins = parseInt(selectedTime.split(":")[1], 10);

        if (mins.length != 0 && hours.length != 0)
        {
            if (hours < 9 || (hours == 23 && mins > 0) || mins % 30 != 0) 
            {
                alert("Часы работы с 9:00 до 23:00 c инетрвалом в 30 минут"); // Уведомление
                timeForm.value = '';
            }
            else if (hours >= 9 && hours <= 12) 
            {
                costCalculate(400, 5)
            }
            else if (hours >= 20 && hours <= 23)
            {
                costCalculate(1000, 6)
            }
            else {
                priceForm.innerHTML = Math.floor(pricePerHour * numberHour * optionOne * optionTwo + numberOfVisitors);
                costCalculate(0, 7)
            }
        }


    }, 10000); // Задержка 1000 мс (1.0 секундf)
});

numberOfPeaple.addEventListener('change', function() {
    numberPeaple = parseInt(numberOfPeaple.value, 10);
    console.log(typeof numberPeaple);
    if (numberOfPeaple.value.length > 0 & Number.isInteger(numberPeaple) & (numberPeaple >= 1 && numberPeaple <= 20)) {
        if (numberPeaple >= 0 && numberPeaple <= 5) {
            priceForm.innerHTML = Math.floor(pricePerHour * numberHour * optionOne * optionTwo);
        }
        else if (numberPeaple > 5 && numberPeaple <= 10) {
            priceForm.innerHTML = Math.floor(pricePerHour * numberHour * optionOne * optionTwo);
            costCalculate(1000, 8);
        }
        else if (numberPeaple > 10 && numberPeaple <= 20) {
            priceForm.innerHTML = Math.floor(pricePerHour * numberHour * optionOne * optionTwo);
            costCalculate(1500, 9);
        }
    }
    else {
        timeout = setTimeout(5000);
        alert("В группе может быть от 1 до 20 человек"); // Уведомление
        numberOfPeaple.value = '';
    }
});




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
        let optionElement = document.createElement('option');
        selectElement.innerHTML = '';
        optionElement.value = "Не выбрано";
        optionElement.text = "Не выбрано";
        selectElement.appendChild(optionElement);
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
            selectButton.className = 'btn btn-success';
            selectButton.textContent = 'Выбрать';
            cell6.appendChild(selectButton);
            
            selectButton.addEventListener('click', function() {
                nameForm.innerHTML = item.name;
                costCalculate(parseInt(item.pricePerHour, 10), 1);
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

            selectButton.addEventListener('click', function() {
                nameForm.innerHTML = item.name;
            });
        }

        languageSet.forEach(function (language) {
            optionElement = document.createElement('option');
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
    selectButton.addEventListener('click', function() {
        nameForm.innerHTML = item.name;
    });
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

