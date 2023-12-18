class MenuCard {
    #id
    #name
    #price
    #description
    #image

    constructor(id, name, price, description, image) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.#image = image;
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
                    <div class="product-cards rounded-4 row mx-auto my-3 text-center">
                        <div class="col-4 p-1 d-flex align-items-center justify-content-center">
                            <img class="rounded-4 img-fluid w-100" src=${this.#image} alt="product-image">
                        </div>

                         <div class="col-8 p-1 d-flex align-items-center justify-content-between">
                            <div class="card-body">
                                <h6>${this.#name}</h6>

                                <p class="font-weight-light text-gray">${this.#description}</p>

                                <div class="btn-group  btn-group-sm g-0" role="group" aria-label="Basic mixed styles example">
                                    <button id="btn-del-product-${this.#id}" type="button" class="btn rounded-start-pill">-</button>
                                    <button type="button" class="btn ">Agregar</button>
                                    <button id="btn-add-product-${this.#id}" type="button" class="btn ">+</button>
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