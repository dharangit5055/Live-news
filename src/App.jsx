// import { useEffect, useState } from "react";
// import "./App.css";
// import News from "./components/news";

// function App() {
//   let [articles, setArticles] = useState([]);
//   let [category, setCategory] = useState("india");
//   let [date, setData] = useState("2024-04-26");

//   useEffect(() => {
//     fetch(
//       `https://newsapi.org/v2/everything?q=${category}&from=${date}&apiKey=4f361fdbc0e6437fb28ea8aa129e2666`
//     )
//       .then((response) => response.json())
//       .then((news) => {
//         setArticles(news.articles);
//         console.log(news.articles);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [category]);

//   return (
//     <div>
//       <header className="header">
//         <h1>Live News</h1>
//         {/* <input
//           type="date"
//           onChange={(e) => {
//             setData(e.target.value);
//           }}
//         /> */}
//         <input
//           type="text"
//           onChange={(e) => {
//             if (e.target.value !== "") {
//               setCategory(e.target.value);
//             } else {
//               setCategory("india");
//             }
//           }}
//           placeholder="Search News"
//         />
//       </header>

//       <section className="news-articles">
//         {articles.length !== 0 ? (
//           articles.map((article) => {
//             return <News article={article} />;
//           })
//         ) : (
//           <h3>No News Availabe For The Searched Text..☹️</h3>
//         )}
//       </section>
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import "./App.css";
import News from "./components/news";

function App() {
  // State variables
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("india");
  const [date, setDate] = useState(getPreviousDate()); // State for the selected date
  const [error, setError] = useState(null); // State for error handling
  const [searched, setSearched] = useState(false); // State to track if search has been performed
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Effect to fetch news articles when component mounts or date changes
  useEffect(() => {
    fetchNews(date);
  }, [date]); // Added 'date' as a dependency to trigger effect on date change

  // Function to handle search button click
  const handleSearch = () => {
    setSearched(true); // Set searched state to true
    fetchNews(date); // Fetch news articles with selected date
  };

  // Function to fetch news articles
  const fetchNews = (selectedDate) => {
    setLoading(true); // Set loading state
    fetch(
      `https://newsapi.org/v2/everything?q=${category}&from=${selectedDate}&apiKey=4f361fdbc0e6437fb28ea8aa129e2666`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((news) => {
        setArticles(news.articles); // Set fetched articles
        setError(null); // Clear error state
      })
      .catch((err) => {
        setError(err.message); // Set error message
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Clear loading state
      });
  };

  // Function to get the date of the previous day
  function getPreviousDate() {
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 1);

    const year = previousDate.getFullYear();
    let month = previousDate.getMonth() + 1;
    let day = previousDate.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      {/* Header section */}
      <header className="header">
        <h1>Live News</h1>
        {/* Date input for selecting date */}
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value); // Update selected date
          }}
        />
        {/* Input for searching news by category */}
        <input
          type="text"
          onChange={(e) => {
            setCategory(e.target.value); // Update category
          }}
          placeholder="Search News"
        />
        {/* Search button to trigger fetching of news */}
        <button onClick={handleSearch} className="search-button">Search</button>
      </header>

      {/* Section to display news articles */}
      <section className="news-articles">
        {/* Display loading indicator while fetching data */}
        {loading && <h3>Loading...</h3>}
        {/* Error message if fetch fails */}
        {error ? (
          <h3>Error: {error}</h3>
        ) : (
          // Display articles if available, or show message if no articles found after search
          articles.length !== 0 ? (
            articles.map((article, index) => {
              return <News key={index} article={article} />;
            })
          ) : searched && (
            <h3>No News Available For The Searched Text..☹️</h3>
          )
        )}
      </section>
    </div>
  );
}

export default App;

