export function validateArticles(articles) {
    return Array.isArray(articles) && articles.every(article => {
        if (!Array.isArray(article.sections) || article.sections.length === 0) return false;
        return article.sections.every(section =>
            section &&
            section.position != null &&
            section.title != null &&
            section.content != null
        );
    });
}