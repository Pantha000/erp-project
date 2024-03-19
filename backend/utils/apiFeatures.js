class ApiFetaures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Name Search
  nameSearch() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // id Search
  idSearch() {
    const keyword = this.queryStr.keyword
      ? {
          id: {
            $regex: this.queryStr.keyword,
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Project Search
  projectSearch() {
    const keyword = this.queryStr.keyword
      ? {
          code: {
            $regex: this.queryStr.keyword,
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  //Filter Option
  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

module.exports = ApiFetaures;
