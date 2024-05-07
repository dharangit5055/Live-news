import "../components/news.css";

export default function News(props) {
  return (
    <div className="news">
      <div className="news-img">
        {props.article.urlToImage !== null ? (
          <img src={props.article.urlToImage} alt="" />
        ) : (
          <img
            src="https://sipr.mojokertokab.go.id/images/avatar/no-image.jpg"
            alt=""
          />
        )}
      </div>
      <h1>{props.article.title}</h1>
      <p>
        {props.article.description?.substring(0, 100).concat("...")}
        <a href={props.article.url} target="_blank" rel="noreferrer">
          Read more
        </a>
      </p>

      <div className="source">
        <p>Author : {props.article.author}</p>
        <p>{props.article.source.name}</p>
      </div>
    </div>
  );
}
