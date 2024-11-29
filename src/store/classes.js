class Dish {
    dish;

    constructor(dish) {
        this.dish = dish;
        this.category = this.dish.category
        this.unit = this.dish.unit
        this.name_uz = this.dish.name_uz
        this.name_ru = this.dish.name_ru
        this.name_en = this.dish.name_en
        this.id = this.dish.id
        this.calory = this.dish.calory
        this.proteins = this.dish.proteins
        this.fats = this.dish.fats
        this.carbohydrates = this.dish.carbohydrates
        this.calcium = this.dish.calcium
        this.phosphorus = this.dish.phosphorus
        this.Magnesium = this.dish.Magnesium
        this.Iron = this.dish.Iron
        this.Zinc = this.dish.Zinc
        this.iodin = this.dish.iodin
        this.Selenium = this.dish.Selenium
        this.vitmin_c = this.dish.vitmin_c
        this.vitamin_a = this.dish.vitamin_a
        this.vitamin_e = this.dish.vitamin_e
        this.vitamin_d = this.dish.vitamin_d
        this.vitamin_b = this.dish.vitamin_b
        this.vitamin_b2 = this.dish.vitamin_b2
        this.vitamin_b6 = this.dish.vitamin_b6
        this.folate = this.dish.folate
        this.vitamin_b12 = this.dish.vitamin_b12
        this.weight = this.dish.weight
    }
}

class VitamineName {
    constructor(vitamine) {
        this.tag = vitamine.tag
        this.icon = vitamine.icon
        this.name_uz = vitamine.name_uz
        this.name_ru = vitamine.name_ru
        this.name_en = vitamine.name_en
    }
}

class Patient {
    constructor() {
    }
}

export {
    Dish, VitamineName
}
