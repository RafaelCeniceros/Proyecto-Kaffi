import Producto from "./product-class.js";

export default async function saveProductsInLocalStorage(url) {
  
  const categoriesArray = await getCategoriesArray("https://kaffi-ecommerce.onrender.com/api/v1/categories");
  console.log(categoriesArray);

  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      console.log("entre aqui");
      const objectToJSON = {};

      for (let j = 0; j < categoriesArray.length; j++) {
        objectToJSON[categoriesArray[j]["name"]] = [];
      }

      // [{},{},{}]
      const productsArray = [];

      for (let i = 0; i < products.length; i++) {
        if (products[i]["active"] == true) {
          let categoryId = products[i]["category"]["id"]
          let categoryName = getNameOfCategoryId(categoryId, categoriesArray);
          const newProduct = new Producto(
            products[i].id,
            products[i].name,
            categoryName,
            products[i]["price"],
            products[i]["description"],
            products[i]["image"]
          )
          productsArray.push(newProduct);
        }
      }


      sortProductsInCategories(productsArray, objectToJSON);

      //console.log(objectToJSON);
      if(localStorage.getItem("fileJsonToLocalStorage")){
        localStorage.removeItem("fileJsonToLocalStorage");
      }

      localStorage.setItem("fileJsonToLocalStorage", JSON.stringify(objectToJSON));

    })
    .catch(error => {
      console.log(error);
    })


}

function getNameOfCategoryId(id, categoriesArray) {
  for (let i = 0; i < categoriesArray.length; i++) {
    if (id == categoriesArray[i]["id"]) {
      return categoriesArray[i]["name"];
    }
  }
}

const getCategoriesArray = async (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      return products;
    })
    .catch((error) => {
      console.log(error);
      throw error; // Propagate the error if needed
    });
};

const sortProductsInCategories = async (array, object) => {
  array.forEach(element => {
    for (const categoryProperty in object) {
      if (element["category"] == categoryProperty) {
        object[categoryProperty].push(element);
      }
    }
  });
}
