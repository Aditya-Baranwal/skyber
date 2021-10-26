follow following steps to run application 
npm install.
npm start.


Application consistis of two api.

1) To Fetch List of Books of Author --> returns details in json format and, write a data into xlxs sheet in file folder.

curl for making request.

curl --location --request GET 'http://localhost:8000/v1/books?author=Stephen+King'




2) To Search Book based on Title

curl for making request.

curl --location --request GET 'http://localhost:8000/v1/book?author=Stephen+King&title=11/22/63'



