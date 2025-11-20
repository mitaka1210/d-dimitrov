// @ts-ignore
export function validateArticles(articles) {
    return articles.filter(article => {
        if (!article.sections || !Array.isArray(article.sections) || article.sections.length === 0) return false;
        return article.sections.every(section =>
            section &&
            section.position != null &&
            section.title != null &&
            section.content != null
        );
    });
}