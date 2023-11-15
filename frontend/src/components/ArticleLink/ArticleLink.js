import "./ArticleLink.css"

/**
 * 
 * Defines the structure and functionality of a link on the articles page
 * The link contains a image and short description relating to the article
 * that the user can click to visit the information page.
 * 
 * @param {*} props Data object containing article link and image
 * @returns An article link component
 */
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

      <a href={props.link} target="_blank">
        <h4 className="article-title">
          {props.children}
        </h4>
      </a>
    </div>
  );
}

export default ArticleLink;