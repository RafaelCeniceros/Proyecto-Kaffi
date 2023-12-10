class Card {
    #name
    #price
    #description
    #image

    constructor(name,price,description,image) {
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#image = image;
    }


    // ------------------------ setters ---------------------------

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


    kaffiCard() {
        return  `
        <div class="container col-sm-6 col-md-3">
            <div class="row flex">
                <div class=>
                    <!-- card -->
                    <div class="card border-light">
                        <img src=${this.#image} alt="product-image">
                        <div class="card-footer border-top border-light p-4">
                            <a href="#" class="h5">${this.#name}</a>
                            <h6 class="font-weight-light text-gray mt-2">${this.#description}</h6>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="h5 mb-0 text-gray">${this.#price}</span>
                                <a class="btn btn-xs btn-primary" href="#">
                                    <span class="fas fa-cart-plus mr-2"></span> Add to cart
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- card -->
                </div>
            </div>
        </div>
        `
    }
}

export default Card;