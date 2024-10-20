function convert(query) {
    let { page = 1, pageSize = 10 } = query;
    page = new Number(page);
    pageSize = new Number(pageSize);

    return { page, pageSize };
}

module.exports = { convert };
