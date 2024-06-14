const payments = document.getElementById('payments');
const details = document.getElementById('details');

function loadJSON(file) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', file, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const lista = JSON.parse(xhr.responseText);

            // Function to render payments
            renderPayments(lista);
        }
    };

    xhr.send(null);
}

function renderPayments(lista) {
    // Clear previous content
    payments.innerHTML = '';

    lista.forEach((element, index) => {
        const paymentElement = document.createElement('div');
        paymentElement.classList.add('payments__payment');
        paymentElement.setAttribute('data-index', index);
        paymentElement.innerHTML = `
            <img class="payments__payment-icon" src="assets/icons/people.svg">
            <span class="payments__payment-agent">${element.name}</span>
            <span class="payments__payment-role">${element.role}</span>
            <span class="payments__payment-wage">R$ ${element.wage}</span>
        `;
        
        paymentElement.addEventListener('click', () => {
            showDetails(element);
        });

        payments.appendChild(paymentElement);
    });
}

function showDetails(data) {
    details.style.display = 'flex';
    details.innerHTML = `
        <button id="details__close">
            <div id="details__close__bar1"></div>
            <div id="details__close__bar2"></div>
        </button>
        <h2>${data.name}</h2>
        <div id="details__atributes">
            <div class="details__atributes__line"><span class="details__atributes__line__label">Situação</span><span class="details__atributes__line__value">${data.situation}</span></div>
            <div class="details__atributes__line"><span class="details__atributes__line__label">Cargo</span><span class="details__atributes__line__value">${data.role}</span></div>
            <div class="details__atributes__line"><span class="details__atributes__line__label">Tipo</span><span class="details__atributes__line__value">${data.type}</span></div>
            <div class="details__atributes__line"><span class="details__atributes__line__label">Data</span><span class="details__atributes__line__value">${data.date}</span></div>
            <div class="details__atributes__line"><span class="details__atributes__line__label">Carga Horária</span><span class="details__atributes__line__value">${data.workload}</span></div>
            <div class="details__atributes__line"><span class="details__atributes__line__label">Pagamento</span><span class="details__atributes__line__value">${data.paymentType}</span></div>
            <div class="details__atributes__line"><span class="details__atributes__line__label">Salário</span><span class="details__atributes__line__value">R$ ${data.wage}</span></div>
        </div>
    `;

    const detailsClose = document.getElementById('details__close');
    detailsClose.addEventListener('click', () => {
        details.style.display = 'none';
    });
}

loadJSON('/database/payroll/fdp-MARÇO.json');
