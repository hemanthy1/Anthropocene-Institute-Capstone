import "./ArticleLink.css"

function ArticleLink(props) {
  return (
    <div className="article-wrap">
      <div className="article-link-wrap">
        <a href={props.link} className="article-link" target="_blank">
          <img 
            src={props.image}
            alt="Article Image Link. Click me!"
            loading="lazy"
            className="article-image"
          />
        </a>
      </div>

      <h4 className="article-title">
        {props.children}
      </h4>
    </div>
  );
}

export default ArticleLink;