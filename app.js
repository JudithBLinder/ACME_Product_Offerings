// import { promises } from "dns";
// import { stat } from "fs";

const state = {
    products: [],
    offerings:[],
    companies:[]
}

const app=document.querySelector('#app');

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
})
    
    
console.log(state);