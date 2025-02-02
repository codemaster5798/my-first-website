async function fetchAndDisplayTop10() {
  try {
    // 1) Fetch data from Rolimon’s API
    const response = await fetch("https://www.rolimons.com/gameapi/games");
    const data = await response.json();
    
    // 2) data.games is an object keyed by game ID. Each value is an array:
    //    [ name, rootPlaceId, visitCount, likeRatio, playing, ... ]
    //    For example:
    //    {
    //      "1818": ["Phantom Forces", 12345, 123456789, 90, 20000, ...],
    //      "1234": ["Adopt Me!", 98765, 999999999, 95, 500000, ...],
    //      ...
    //    }
    const gamesObj = data.games;
    
    // Convert to an array of objects we can sort
    const gamesArray = Object.entries(gamesObj).map(([gameId, info]) => {
      return {
        id: gameId,
        name: info[0],
        playing: info[4] // The 5th element is current players
      };
    });
    
    // 3) Sort by "playing" descending
    gamesArray.sort((a, b) => b.playing - a.playing);
    
    // 4) Take the top 10
    const top10 = gamesArray.slice(0, 10);
    
    // 5) Display them in <ul id="games-list">
    const listElement = document.getElementById("games-list");
    
    if (listElement) {
      // Clear any existing list items
      listElement.innerHTML = "";
      
      top10.forEach(game => {
        const li = document.createElement("li");
        li.textContent = `${game.name} — ${game.playing} players online`;
        listElement.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error fetching or processing Rolimon's data:", error);
  }
}

// Fetch and display on page load
window.onload = fetchAndDisplayTop10;
