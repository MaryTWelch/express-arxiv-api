var ArxivService = require('../services/arxiv.service');
var ArticleService = require('../services/article.service');
var AuthorService = require('../services/author.service');

var logArticleData = [];
var logAuthorData = [];
var arxivArticles = [];

exports.syncAllData = async function (req, res) {
    
    try {
        arxivArticles = await ArxivService.getArxivData();

        createArticles()
        .then(articleData => {
            logArticleData = articleData.sort((a, b) => (a.id > b.id) ? 1 : -1);
            return logArticleData;
        })
        .then((articleData) => {
            return createAllArticleAuthors(articleData);
        })
        .then(authorData => {
            logAuthorData = authorData.sort((a, b) => (a.name > b.name) ? 1 : -1);
            return res.status(200).json({ status: 200, message: "Successfully Synced Arxiv data", articles: logArticleData, authors: logAuthorData});;
        })
        .catch((e) => {
            console.error('Create article/author data error: ' + e);
            return res.status(500).json({ status: 500, message: e.message });
        });
    } catch (e) {
        console.error('Sync arxiv data error: ' + e);
        return res.status(500).json({ status: 500, message: e.message });
    }
};

const createArticle = async (article) => {
    const createResult = await ArticleService.create(article).catch(err => {console.error('Article create error: ' + err)});
    return createResult;
};

const createArticles = async () => {
    return Promise.all(arxivArticles.map(article => createArticle(article)));
};

const createAuthor = async (authorName, articleId) => {
    const author = {
        name: authorName
    };

    const createAuthorResult = await AuthorService.createAuthor(author, articleId).catch(err => {console.error('Author create error: ' + err)});
    return createAuthorResult;
}

const createArticleAuthors = async (articleId, authors) => {
    return Promise.all(authors.map(author => {
        const authorResult = createAuthor(author[0], articleId);
        return authorResult;
    }));
};

const createAllArticleAuthors = async (articleData) => {
    return Promise.all(articleData.map(article => {
        const articleAuthorCreate = createArticleAuthors(
            article.id, 
            arxivArticles.find( ({ id }) => id === article.arxiv_id ).authors
        );
        return articleAuthorCreate;
    }));
}