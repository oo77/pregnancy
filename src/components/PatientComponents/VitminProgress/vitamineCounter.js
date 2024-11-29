import {userAuth} from "@/store/userAuth";
import {useDishesStore} from "@/store/dishStore";

function currentTrim() {
    const user = userAuth().user
    const date1 = (new Date(user.pregnancyDate)).getTime()
    const date2 = (new Date(Date.now())).getTime()
    const diffDays = Math.ceil((Math.abs((date2 - date1)) / (1000 * 3600 * 24)))

    return Math.ceil(diffDays / 7) < 12 ? 1 : Math.ceil(diffDays / 7) < 24 ? 2 : 3
}

function currentTrimByUser(uid) {
    const user = userAuth().getUserById(uid)
    const date1 = (new Date(user.pregnancyDate)).getTime()
    const date2 = (new Date(Date.now())).getTime()
    const diffDays = Math.ceil((Math.abs((date2 - date1)) / (1000 * 3600 * 24)))

    return Math.ceil(diffDays / 7) < 12 ? 1 : Math.ceil(diffDays / 7) < 24 ? 2 : 3
}


function percentageShareoOfTheTotal(dishes) {
    
    let filtered = {}
    const normalValuesForTrim = useDishesStore().getNormalValues[currentTrim() - 1]
    const percentage = {}
    let sumDailyDish = {}
    let tags = useDishesStore().getVitaminTags

    let dates = new Set(dishes.map(dish => {
        return dish.eatingTime.split("T")[0]
    }))

    for (const date of dates) {
        filtered[date] = dishes.filter(dish => dish.eatingTime.split("T")[0] === date)
    }

    for (const tag of tags) {
        sumDailyDish[tag] = 0
    }

    for (const date of dates) {
        filtered[date].map(dish => {
            let sorted = {}
            let d = useDishesStore().getDishById(dish.dishId)
            for (const tag of tags) {
                sorted[tag] = d[tag] > 0 ? d[tag] * dish.dishValue / d.weight : 0;
                sumDailyDish[tag] += sorted[tag]
            }
        })
    }

    for (const tag of tags) {
        percentage[tag] = sumDailyDish[tag] * 100 / (dates.size * normalValuesForTrim[tag])
    }


    return percentage
}

export {currentTrim, percentageShareoOfTheTotal, currentTrimByUser}


// bazadagi barcha raqamlar 100g nisbatan