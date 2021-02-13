Test task for marcopolo learning

1.1. Please satisfy the following requirements:
Develop a small stateless web application that will prompt a login screen to the user asking for
authentication (username and password).
After the login, prompt a list of products, the products in the list will have to display a title, description, and
an image (the image can be random). The application must run from docker with a docker image build
script.
Design Requirements:
1. The auth should perform by separate Node Js Microservice
2. The orders list should be provided by Spring Boot Backend
3. Any Front end technology can be used

1.2. Extra requirement (optional):
Every item in the list can be visualised in details, edited, removed.


docker compose script use network mode host. This means before launch you should check ports on the local machine

3000 - node.js auth api

8080 - web ui (vue.js)

9090- spring boot api (reactive kotlin coroutines repositories)

15432, 14432 - databases for auth and spring boot

Most parameters in the docker files hardcoded, it will be nice to make ports, db urls configurable, but it seems I don't have time for this.

Also I use default spring exception resolver, which returns stack trace, in real project this is impossible of course.

Oauth refresh token not supported. Instead we redirect user to login if token expired.

There are 3 predefined users

max

nick

eva

password aaaa1111 for everyone

Auth server has an api for register client and user, this is only for testing purposes.

2.1. Exercise 1: Write in pseudo-code a function that given an array of numbers find the maximum
number;

assumptions

1. Array indices starts with 0
2. array is mutable, this means we modify values in existing array when sort instead of creating new array

If array is null or array is empty return null.

Assign array first element to the sum variable.

In loop starting from the second element (index 1) until end of array do

If array element greater than max update max with array element
return max variable

2.2. Exercise 2: Write a function in pseudo-code that given an array of numbers will return the ordered
array (from smallest to bigger positive number).
e.g.:
Arr => [0, -2,5,1,8,1,9,-10]
Res => [-10,-2,0,1,1,5,8,9]

Exercise 2.2

If array is null or array is empty or array has exact one element return source array.

For each element starting from position 2 (index 1) until end of array do

If previous element greater than current then swap elements.

Repeat loop above until nothing to swap

2.3. Extra requirement (optional):
Write a class matrix that represent a square matrix NXN (with N number of columns equal to the number of
rows) that expose 2 public functions:
drawDiagonals:
Return a matrix NxN with all cells set a 0 excepts for the 2 diagonals set to a random number
getCenter:
Return the Cell value representing the intersection of the 2 diagonals

It was not clear should I write a class in pseudocode or not.
Class in the project org.mp.productmanagement.matrix.Matrix

I assume that data in the class mutable, each drawDiagonals change array and returns the same instance
