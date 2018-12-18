export interface Article {
    ID: Number,
    title: String,
    slug: String,
    picture: String,
    intro: String,
    content: String,
    userID: Number,
    timestampCreated: Date,
    timestampUpdated: Date,
    user?: Object
}
