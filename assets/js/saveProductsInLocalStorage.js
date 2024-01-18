import Producto from "./product-class.js";

export default async function saveProductsInLocalStorage(url) {

  const storedProducts = JSON.parse(localStorage.getItem('fileJsonToLocalStorage'));

  if (storedProducts) {
    console.log("Los productos han sido encontrados en el LocalStorage")
  }
  else {

    const categoriesArray = await getCategoriesArray("../../categories.json");
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


        sortProductsInCategories(productsArray,objectToJSON);

        //console.log(objectToJSON);
        localStorage.setItem("fileJsonToLocalStorage", JSON.stringify(objectToJSON));

      })
      .catch(error => {
        console.log(error);
      })
  }

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
