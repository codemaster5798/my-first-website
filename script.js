/**
 * Fetches data from Rolimon's and displays the top 10 Roblox games
 * by current player count on the webpage.
 */
async function fetchAndDisplayTop10() {
  try {
    // 1) Fetch data from Rolimon's API
    const response = await fetch("https://www.rolimons.com/gameapi/games");
    const data = await response.json();

    // 2) The JSON has a "games" object with game IDs as keys.
    //    Each entry is an array like:
    //    [ name, rootPlaceId, visitCount, likeRatio, playingCount, ...
    //    So data.games might look like:
    //    {
    //      "1818": ["Phantom Forces", 12345, 123456789, 90, 20000, ...],
    //      "1234": ["Adopt Me!", 98765, 999999999, 95, 500000, ...],
    //       ...
    //    }
    //
    //    We'll convert it to a friendlier array of objects.
    const gamesObj = data.games;
    const gamesArray = Object.entries(gamesObj).map(([gameId, info]: [string, any]) => {
      return {
        id: gameId,
        name: info[0],
        playing: info[4], // the 5th element is the current "playing" count
      };
    });

    // 3) Sort the array by `playing` in descending order
    gamesArray.sort((a, b) => b.playing - a.playing);

    // 4) Take the top 10
    const top10 = gamesArray.slice(0, 10);

    // 5) Display them on the webpage in <ul id="games-list">
    const listElement = document.getElementById("games-list");
    if (listElement) {
      // Clear any existing content
      listElement.innerHTML = "";
      // Create an <li> for each of the top 10 games
      top10.forEach((game) => {
        const li = document.createElement("li");
        li.textContent = `${game.name} — ${game.playing} players online`;
        listElement.appendChild(li);
      });
    }

  } catch (error) {
    console.error("Error fetching or processing Rolimon's data:", error);
  }
}

// Run this function when the page loads
fetchAndDisplayTop10();
