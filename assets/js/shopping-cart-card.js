class ShoppingCard {
    #id
    #name
    #price
    #description
    #image
    #quantity

    constructor(id, name, price, description, image, quantity) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#image = image;
        this.#quantity = quantity;
    }


    // ------------------------ setters ---------------------------

    get id(){
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get price() {
        return this.#price;
    }

    get description() {
        return this.#description;
    }

    get image() {
        return this.#image;
    }

    get quantity() {
        return this.#quantity;
    }

    // ---------------- setters ------------------------------
    set name(newName) {
        this.#name = newName;
    }

    set price(newPrice) {
        this.#price = newPrice;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

    set image(newImage) {
        this.#image = newImage;
    }

    set quantity(newQuantity) {
        this.#quantity = newQuantity;
    }


   showShoppingCard() {
        return `
                <!-- card beggining-->
                <div id="card-of-element-${this.#id}">
                <div class="product-card col-12 d-flex justify-content-center align-items-center flex-column my-2">
                    <div class="row d-flex justify-content-center align-items-center w-100">
                        <div class="col-4 flex-grow-1" id="img-pic-container">
                            <img class="d-flex img-fluid" src=${this.#image}>
                        </div>
                        <div class="col-4 d-flex flex-column align-items-start justify-content-center flex-grow-1">
                            <h6>Producto:</h6>
                            <h6 id="product-name">${this.#name}</h6>
                        </div>
                        <div class="col-4 d-flex flex-column align-items-start justify-content-center flex-grow-1 h-100">
                            <div id="cantity-container" class="row d-flex align-items-center justify-content-center w-100 py-1">
                                <h6 class="col-md-6 d-flex justify-content-center align-items-start">Cantidad:</h6>
                                <div class="col-md-6 d-flex align-items-center justify-content-center">
                                    <button id="btn-add-product-${this.#id}" class="cantity-control">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                    <span id="span-with-product-quantity-${this.#id}" class="d-flex"> ${this.#quantity} </span>
                                    <button id="btn-del-product-${this.#id}" class="cantity-control">
                                        <i class="fa-solid fa-minus"></i>
                                    </button> 
                                </div>
                            </div>
                            <div id="price-container" class="row d-flex align-items-center justify-content-center w-100">
                                <h6 class="col-md-6 d-flex justify-content-center align-items-start">Precio:</h6>
                                <div class="col-md-6 d-flex w-50 align-items-center justify-content-center">
                                    <h6 id="product-price" class="d-flex align-items-center justify-content-center w-100">
                                    ${this.price}
                                    </h6>
                                </div>
                            </div>
                            <div id="delete-all-products-container"class="row d-flex justify-content-center align-items-center w-100 py-md-3">
                                <button id="delete-all-products-id-${this.#id}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center align-items-center w-100 pt-3 pt-md-0">
                        <h6 id="product-subtotal-${this.#id}">Subtotal(${this.#quantity} ) Producto(s) : $ ${this.price * this.#quantity}</h6>
                    </div>
                </div>
                </div>
                <!-- card -->
        `
    }
}

export default ShoppingCard;