const https = require("https");

const http = async (endpoint) => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://themealdb.com/api/json/v1/1/${endpoint}`,
      {
        method: "GET",
      },
      (res) => {
        const body = [];
        res.on("data", (chunk) => body.push(chunk));
        res.on("end", () => {
          const resString = Buffer.concat(body).toString();
          resolve(resString);
        });
      }
    );

    req.on("error", (err) => {
      reject(null);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(null);
    });
    req.end();
  });
};

/**
 * Search meal by name.
 *
 * @param  {string} s Meal name
 * @return            List of objects
 */
async function search(s) {
  try {
    let response = await http(`search.php?s=${encodeURI(s)}`);
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Search meals by first letter.
 *
 * @param  {string} s Meal letter
 * @return            List of objects
 */
async function searchByLetter(s) {
  try {
    let response = await http(`search.php?f=${s}`);
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Search meal details by id.
 *
 * @param  {number} i Meal id.
 * @return            object
 */
async function searchByID(i) {
  try {
    let response = await http(`lookup.php?i=${i}`);
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals[0];
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Search a random meal.
 *
 * @return      random meal
 */
async function random() {
  try {
    let response = await http("random.php");
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals[0];
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * List the meals categories.
 *
 * @return     List of objects
 */
 async function mealCategories() {
  try {
    let response = await http("categories.php");
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.categories != null &&
        typeof data.categories !== "undefined" &&
        data.categories != ""
      ) {
        return data.categories;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Filter by ingredient.
 *
 * @param  {string} s Ingredient name.
 * @return            List of objects
 */
async function filterByIngredient(s) {
  try {
    let response = await http(`filter.php?i=${encodeURI(s)}`);
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Filter by area.
 *
 * @param  {string} s area.
 * @return            List of objects
 */
async function filterByArea(s) {
  try {
    let response = await http(`filter.php?a=${encodeURI(s)}`);
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Filter by category.
 *
 * @param  {string} s Category name.
 * @return            List of objects
 */
async function filterByCategory(s) {
  try {
    let response = await http(`filter.php?c=${encodeURI(s)}`);
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * List the categories filter.
 *
 * @return   List of categories
 */
async function categoriesFilter() {
  try {
    let response = await http("list.php?c=list");
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        let dataList = [];
        data.meals.forEach((filter) => {
          dataList.push(filter.strCategory);
        });
        return dataList;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * List the ingredients filter.
 *
 * @return   List of ingredients
 */
async function ingredientsFilter() {
  try {
    let response = await http("list.php?i=list");
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        return data.meals;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * List the area filter.
 *
 * @return   List of area filters
 */
async function areaFilter() {
  try {
    let response = await http("list.php?a=list");
    if (response != null && typeof response !== "undefined" && response != "") {
      let data = JSON.parse(response);
      if (
        data.meals != null &&
        typeof data.meals !== "undefined" &&
        data.meals != ""
      ) {
        let dataList = [];
        data.meals.forEach((filter) => {
          dataList.push(filter.strArea);
        });
        return dataList;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

module.exports = {
    search,
    searchByID,
    searchByLetter,
    random,
    mealCategories,
    filterByArea,
    filterByCategory,
    filterByIngredient,
    categoriesFilter,
    areaFilter,
    ingredientsFilter
};