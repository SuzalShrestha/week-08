/*
Make fetch requests in the browser for each of the following phases.
Paste your code for fetch requests here once you finish each phase.
*/

/* ============================== Phase 1 ============================== */

// Your code here
// const url="/products";
// const headers={"Content-Type":"application/x-www-form-urlencoded"}
// const body="name=Caribbean+Delight+Coffee&description=Made+by+Manatee+Coffee&price=11%2E99&categories=grocery";
// const options={
//     method:"POST",
//     headers:headers,
//     body:body
    
// }
// fetch(url,options);


/* ============================== Phase 2 ============================== */

// Your code here
// const url="/products";
// const headers={"Content-Type":"application/x-www-form-urlencoded"}
// const body="name=Caribbean+Delight+Coffee&description=Made+by+Manatee+Coffee&price=11%2E99&categories=grocery";
// const options={
//     method:"POST",
//     headers:headers,
//     body:body
    
// }
fetch(url,options).then(response=>{
    console.log(response.status);
    console.log(response.headers.get("Content-Type"));
    console.log(response.url);
    console.log(response.redirected);
});


/* ============================== Phase 3 ============================== */

// Your code here
const url="/products";
const headers={"Content-Type":"application/x-www-form-urlencoded"}
const body= new URLSearchParams({
  name: "Caribbean Delight Coffee",
  description: "Made by Manatee Coffee",
  price: 11.99,
  categories: "grocery"
});
const options={
    method:"POST",
    headers:headers,
    body:body
    
}
fetch(url,options).then(response=>{
    console.log(response.status);
    console.log(response.headers.get("Content-Type"));
    console.log(response.url);
    console.log(response.redirected);
});
