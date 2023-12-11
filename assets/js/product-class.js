class Producto {
    #id;
    #name;
    #category;
    #price;
    #description;
    #image;

    constructor(id, name, category, price, description, image) {
        this.#id = id;
        this.#name = name;
        this.#category = category;
        this.#price = price;
        this.#description = description;
        this.#image = image;
    }

    // ----------------- getters -----------------------------
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get category() {
        return this.#category;
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

    set category(newCategory) {
        this.#category = newCategory
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

    
}

export default Producto;