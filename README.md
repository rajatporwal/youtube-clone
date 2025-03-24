YouTube Search App 🎬🔍
A React-based YouTube search application that utilizes the YouTube Data API v3 to fetch and display videos based on user queries. It features infinite scrolling with react-virtualized to enhance performance and ensure smooth browsing.

🚀 Features
✅ Search YouTube Videos – Fetch and display a list of YouTube videos based on user input.
✅ Infinite Scrolling – Automatically loads more videos as the user scrolls down.
✅ Virtualized Rendering – Uses efficient rendering techniques to prevent performance issues with large lists.

🛠️ Technologies Used
React – Frontend framework
YouTube Data API v3 – Fetching video search results
React Virtualized – Optimizing performance with windowing techniques

📌 How It Works
User enters a search query – The app fetches results using the YouTube API.
Videos are displayed using react-virtualized – Only visible items render for better performance.
Infinite scrolling – More videos are fetched dynamically as the user scrolls.
Optimized rendering – Prevents unnecessary re-renders and DOM overload.

## Building and running the app

In the project directory, you can run:

`npm install && npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To run tests

`npm test`
