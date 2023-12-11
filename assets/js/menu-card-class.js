class MenuCard {
    #name
    #price
    #description
    #image

    constructor(name, price, description, image) {
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
        return `
                    <!-- card -->
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="product-cards rounded-4 row cad g-0 me-0 me-md-2 my-3 text-center">
                            <div class="col-4 p-1">
                                <img class="rounded-4 img-fluid" src=${this.#image} alt="product-image">
                            </div>

                            <div class="col-8 p-1">
                                <div class="card-body">
                                    <h6>${this.#name}</h6>

                                    <p class="font-weight-light text-gray mt-2">${this.#description}</p>

                                    <div class="btn-group  btn-group-sm g-0" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class="btn rounded-start-pill">-</button>
                                    <button type="button" class="btn ">Agregar</button>
                                    <button type="button" class="btn ">+</button>
                                    <button type="button" class="btn rounded-end-pill">$ ${this.price}</button>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <!-- card -->
        `
    }
}

export default MenuCard;