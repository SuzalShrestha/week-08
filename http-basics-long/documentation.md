============================================
============================================
## EXAMPLE DOCUMENTATION
### Ask for the Home Page
#### Step 1
Predicted Request components:
- Method: GET
- URL: /
- Headers: none
- Body: none

Predicted Response components:
- Status Code: 200
- Headers:
  - Content-Type: text/html
- Body: HTML page with navigation links to other pages

#### Step 2
In your browser open the chrome dev tools, navigate to [http://localhost:5000] and make a GET request for the Home Page (type "/" into the URL after 5000 and hit "enter").
Explore the "network" tab and find where you can compare your predicted request/response components to the actual components.

#### Step 3
If your prediction was wrong, try to understand why it was incorrect and then update your documentation to the correct request/response components.

Congratulations! You have performed a GET request to / showing the home page of our e-commerce
website. Move on to the next request/response documentation.

* Note
    - Headers contain many keys, but for this exercise focus on **Content-Type** and **Location**.
 
=============================================
=============================================

### Ask for a page that doesn't exist

Request components:
- Method:GET
- URL:http://localhost:5000/doesnotexist
- Headers:none
- Body:none

Response components:
- Status code:404 not found
- Headers: 
          Content-type:text/html
- Body:404 not found

### Ask for the products list page

Request components:
- Method:GET
- URL:http://localhost:5000/products
- Headers:none
- Body:none

Response components:
- Status code: 200 OK
- Headers:
          Content-type:text/html
- Body: list of products

### Ask for the product detail page

Here's an example product on the server:

| detail      | value                                                      |
| ----------- | ---------------------------------------------------------- |
| productId   | 1                                                          |
| name        | "Facial Cleansing Brush"                                   |
| description | "Reaches deep pores to cleanse oil, dirt, and blackheads." |
| price       | 23.99                                                      |
| categories  | "beauty", "electronics"                                    |

Request components:
- Method:GET
- URL: https://localhost:5000/products/1
- Headers: none
- Body: none

Response components:
- Status code:200 OK 
- Headers:
          Content-type:text/html
- Body: details of productID

### Ask for the create new product page

Request components:
- Method:GET
- URL:http://localhost:5000/products/new
- Headers: 
          Content-type:text/html
- Body:   none

Response components:
- Status code:  200 OK 
- Headers:  
          Content-type:text/html
- Body:   create new product page

### Submit a new product

Remember, for a traditional HTML web server, whenever a successful `POST`
request is sent to the server, the server should respond with a redirection to
a page.

After successful submission, user should be looking at the product detail page.

Here are the categories on the server:

| tag         | name           |
| ----------- | -------------- |
| grocery     | Grocery        |
| electronics | Electronics    |
| beauty      | Beauty         |
| toys-games  | Toys and Games |
| health      | Health         |
| furniture   | Furniture      |
| clothing    | Clothing       |

* Note: In Chome dev tools, if the "body" of a request exists, it will appear 
in the network tab as "payload".

Request components:
- Method: POST
- URL: https://localhost:5000/products
- Headers: 
          Content-type:application/x-www-form-urlencoded
- Body: details of product

Response components:
- Status code:  302 Found
- Headers:  
          Content-type:text/html
          Location:https://localhost:5000/products/2
- Body:   none

### Ask for the edit product page

Request components:
- Method: GET
- URL:  https://localhost:5000/products/1/edit
- Headers: none
- Body:   none

Response components:
- Status code:  200 OK
- Headers:  
          Content-type:text/html
- Body:  edit product page

### Submit an edit for an existing product

After successful submission, user should be looking at the product detail page.

Request components:
- Method:POST
- URL:http://localhost:5000/products/1
- Headers:  
          Content-type:application/x-www-form-urlencoded
- Body: details of product 

Response components:
- Status code: 302 Found
- Headers:  
          Content-type:application/x-www-form-urlencoded
          Location:https://localhost:5000/products/1
- Body:   none

### Submit a delete for an existing product

After successful submission, user should be looking at the products list page.

Request components:
- Method: POST
- URL:  https://localhost:5000/products/1/delete
- Headers:  
          Content-type:application/x-www-form-urlencoded  
- Body: none

Response components:
- Status code:  302 Found
- Headers:  
          Content-type:text/html
          Location:https://localhost:5000/products
- Body:   none

### Submit a new review for a product

After successful submission, user should be looking at the product detail page.

Here's an example review on the server:

| detail     | value                  |
| ---------- | ---------------------- |
| reviewId   | 1                      |
| comment    | "I love this product!" |
| starRating | 5                      |
| productId  | 1                      |

Request components:
- Method: POST
- URL:  https://localhost:5000/products/1
- Headers:  
          Content-type:application/x-www-form-urlencoded
- Body: details of review

Response components:  
- Status code:  302 Found
- Headers:  
          Content-type:text/html
          Location:https://localhost:5000/products/1
- Body:   none

### Ask for the edit review page for a product

Request components:
- Method:   GET
- URL:  https://localhost:5000/reviews/1/edit
- Headers:  none
- Body: none

Response components:
- Status code:  200 OK
- Headers:  
          Content-type:text/html
- Body:   edit review page

### Submit an edit for an existing review

After successful submission, user should be looking at the product detail page.

Request components:
- Method: POST
- URL:  https://localhost:5000/reviews/1
- Headers:  
          Content-type:application/x-www-form-urlencoded
- Body:   details of review

Response components:
- Status code:  302 Found
- Headers:  
          Content-type:text/html
          Location:https://localhost:5000/products/1
- Body:  none

### Submit a delete for an existing review

After successful submission, user should be looking at the product detail page.

Request components:
- Method: POST
- URL:  https://localhost:5000/reviews/1/delete
- Headers:  
          Content-type:application/x-www-form-urlencoded
- Body:   none

Response components:
- Status code:  302 Found 
- Headers:  
          Content-type:text/html
          Location:https://localhost:5000/products/1
- Body:   none

### Ask for all the products in a particular category by tag of the category

Request components:
- Method: GET
- URL:  https://localhost:5000/categories/grocery/products
- Headers:  none
- Body:   none

Response components:
- Status code:  200 OK
- Headers:  
          Content-type:text/html
- Body:   list of products in the category

### Ask for the best-selling product

Look for clues in the HTML pages from the prior responses for what the route should be.

Request components:
- Method:   GET
- URL:  https://localhost:5000/products/best-selling
- Headers:  none
- Body:   none

Response components:
- Status code:  200 OK
- Headers:  
          Content-type:text/html
- Body:   best-selling products page