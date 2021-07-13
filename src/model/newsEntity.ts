export interface newsEntity {
    source: {
        id?: String;
        name?: String;
    };
    author?: String;
    title?: String;
    description?: String;
    url?: String;
    urlToImage: String;
    publishedAt: Date;
    content?: String;
}
