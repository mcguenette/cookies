'use strict';

class Cookie {
    #browser;
    #system;
    #width;
    #height;

    constructor (browser, system, width, height ) {
        this.#browser = browser;
        this.#system = system;
        this.#width = width;
        this.#height = height;
    }

    getBrowser() {
        return this.#browser;
    }
    getSystem() {
        return this.#system;
    }
    getWidth() {
        return this.#width;
    }
    getHeight() {
        return this.#height;
    }
};

export {Cookie};