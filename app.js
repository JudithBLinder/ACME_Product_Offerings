// import { promises } from "dns";
// import { stat } from "fs";

const state = {
    products: [],
    offerings:[],
    companies:[]
}

const app = document.querySelector('#app');

const create = (type) => document.createElement(type);

const header = create('h1');
header.innerText = 'Acme Product Offerings';
app.append(header);

const productsContainer = create('div');
productsContainer.classList.add('productsContainer');
app.append(productsContainer);

const createProduct = (product, offerings, companies) => {
    const productContainer = create('div');
    productContainer.classList.add('productContainer')
    // const productHeader = create('h2');
    const productHeaderLink = create('a');
    productHeaderLink.setAttribute('href',`${product.name}`);
    productHeaderLink.innerText = `${product.name}`;

    productHeaderLink.addEventListener('click', ev => {
        ev.preventDefault();
        window.location.hash = product.name;
    });


    const description = create('p');
    description.innerText = `${product.description} set $${product.suggestedPrice}.00`;

    const offeringList = create('ul');

    offerings.forEach(offer => {
        if (offer.productId === product.id) {
            const item = create('li');
            companies.forEach(company => {
                if (offer.companyId === company.id) {
                    item.innerText = `Offerd by: ${company.name} at ${offer.price}`;
                    offeringList.append(item);
                };
            });
        };
    });

    productContainer.append(productHeaderLink);
    productContainer.append(description);
    productContainer.append(offeringList);
    return productContainer;
}



const OFFERINGS_URL='https://acme-users-api-rev.herokuapp.com/api/offerings';
const COMPANIES_URL='https://acme-users-api-rev.herokuapp.com/api/companies';
const PRODUCTS_URL='https://acme-users-api-rev.herokuapp.com/api/products';

// fetch (PRODUCTS_URL).then(res=> res.json()).then(data=> console.log(data))
// fetch (OFFERINGS_URL).then(res=> res.json()).then(data=> console.log(data))
// fetch (COMPANIES_URL).then(res=> res.json()).then(data=> console.log(data))

const getProducts= fetch(PRODUCTS_URL);
const getCompanies=fetch(COMPANIES_URL);
const getOfferings=fetch(OFFERINGS_URL);
    
Promise.all([getProducts, getOfferings, getCompanies]).then(res=>
    Promise.all(res.map(element => element.json())))
    .then(data=>{
        state.products=data[0]
        state.offerings=data[1]
        state.companies=data[2]

        console.log(state);

        renderAll();
    });

const render = () => {
    productsContainer.innerHTML = '';

    const productName = window.location.hash.slice(1);
    console.log(window.location.hash);
    state.products.forEach(product => {
        if (product.name == productName){
            const newProduct = createProduct(product, state.offerings, state. companies);
            productsContainer.append(newProduct);
        };
    });
}

const renderAll = () => {
    window.location.hash = '';
    state.products.forEach(product => {
        const newProduct = createProduct(product, state.offerings, state. companies);
        productsContainer.append(newProduct);
    });
};

let flag = 0;
window.addEventListener('hashchange', (ev) => {
    if (flag === 0) {
        render();
        flag = 1;
    } else {
        renderAll();
        flag = 0;
    }  
})