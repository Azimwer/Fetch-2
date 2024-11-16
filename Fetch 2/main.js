let cards = document.querySelector("#cards");
let inputs = document.querySelectorAll("input");
let button = document.querySelector("button");

fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(info => {
        console.log(info)
        button.addEventListener("click", () => {
            let filteredData = filterDataArray(info.products);
            readArray(filteredData);
        });
        readArray(info.products); // выводим все данные сразу при загрузке
    });

function filterDataArray(data) {
    let filteredData = data.filter((product) =>
        product.title.toLowerCase().includes(inputs[0].value.toLowerCase()) &&
        product.price >= inputs[1].value
    );
    return filteredData;
}

function readArray(data) {
    cards.innerHTML = ""; // очищаем предыдущие данные
    data.map((item) => {
        let card = document.createElement("div");
        card.className = "flex-1 min-w-[280px] p-5 bg-white text-accent rounded-lg shadow-lg";
        card.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.name}">
            <h2 class="text-primary font-semibold">${item.title}</h2>
            <p class="text-sm">${item.description}</p>
            <p class="badge badge-accent"> $${item.price} </p>
             <p class="badge badge-accent"> $${item.category} </p>
        `;
        cards.appendChild(card); // добавляем карточку в DOM
    });
}
