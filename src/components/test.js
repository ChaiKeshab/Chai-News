let articles = [
    {
        "title": "Anime The Cafe Terrace and Its Goddesses Season 2 Tayang 2024!",
        "author": "Wahyu Firmansyah",
        "published_date": "2023-06-26 03:32:38",
        "published_date_precision": "full",
        "clean_url": "intipseleb.com",
        "twitter_account": "@intipseleb",
        "_score": 15.495552,
        "_id": "7a8b94f6755e86f7373868e45998a026"
    },
    {
        "title": "Anime The Cafe Terrace and Its Goddesses Season 2 Tayang 2024!",
        "author": "Wahyu Firmansyah",
        "published_date": "2023-06-26 03:32:38",
        "published_date_precision": "full",
        "clean_url": "intipseleb.com",
        "twitter_account": "@intipseleb",
        "_score": 15.495552,
        "_id": "7a8b94f6755e86f7373868e45998a026"
    }, {
        "title": "Anime The Cafe Terrace and Its Goddesses Season 2 Tayang 2024!",
        "author": "Wahyu Firmansyah",
        "published_date": "2023-06-26 03:32:38",
        "published_date_precision": "full",
        "clean_url": "intipseleb.com",
        "twitter_account": "@intipseleb",
        "_score": 15.495552,
        "_id": "7a8b94f6755e86f7373868e45998a026"
    }, {
        "title": "Anime Te Cafe Terrace and Its Goddesses Season 2 Tayang 2024!",
        "author": "Wahyu Firmansyah",
        "published_date": "2023-06-26 03:32:38",
        "published_date_precision": "full",
        "clean_url": "intipseleb.com",
        "twitter_account": "@intipseleb",
        "_score": 15.495552,
        "_id": "7a8b94f6755e86f7373868e45998a026"
    },
    { "title": "ho" }
]

if (articles[0].title === articles[2].title) {
    console.log("yes")
} else {
    console.log('No')
}
console.log(articles.filter((e, i) => {
    if (articles[i + 1]) return e.title !== articles[i + 1].title
    else return e
}))