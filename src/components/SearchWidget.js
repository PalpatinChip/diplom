import React, { useState } from 'react';
import ArticleList from './ArticleList';
import ImageList from './ImageList';
import VideoList from './VideoList';

const SearchWidget = ({ tag, onBack }) => {
  console.log('переход в панель виджетов');
  const [activeSection, setActiveSection] = useState('articles');
  const [fetchVideos, setFetchVideos] = useState(false);
  const [fetchImages, setFetchImages] = useState(false);
  const [fetchArticles, setFetchArticles] = useState(false);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (section === 'videos') {
      setFetchVideos(true);
    }
    if (section === 'images') {
      setFetchImages(true);
    }
    if (section === 'articles') {
      setFetchArticles(true);
    }
  };

  return (
    <div className="search-widget open">
      <button id="back-button" onClick={onBack}>Back</button>
      <div className="results">
        <div className="menu">
          <button onClick={() => handleSectionClick('articles')}>Articles</button>
          <button onClick={() => handleSectionClick('images')}>Images</button>
          <button onClick={() => handleSectionClick('videos')}>Videos</button>
        </div>
        <div className="content">
          <section className={activeSection === 'articles' ? 'active' : ''}>
            <h2>Results for: {tag}</h2>
            <ArticleList tag={tag} shouldFetch={fetchArticles} />
          </section>
          <section className={activeSection === 'images' ? 'active' : ''}>
            <h2>Results for: {tag}</h2>
            <ImageList tag={tag} shouldFetch={fetchImages} />
          </section>
          <section className={activeSection === 'videos' ? 'active' : ''}>
            <h2>Results for: {tag}</h2>
            <VideoList tag={tag} shouldFetch={fetchVideos} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;
