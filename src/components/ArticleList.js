import React, { useEffect, useState } from 'react';
import searchArticles from '../services/newsApiService';

const ArticleList = ({ tag, shouldFetch }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched || !shouldFetch) return;
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching articles for tag: ${tag}`);
        const result = await searchArticles(tag);
        console.log('Fetched articles:', result);
        setArticles(result || []);
        setFetched(true);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [tag, shouldFetch, fetched]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Articles</h3>
      <ul>
        {articles.map((article) => (
          <li key={article.url}>
            <h4>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h4>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
