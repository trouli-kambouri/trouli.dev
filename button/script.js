let i = 0
document.getElementById("timeSpentClicking").textContent = time

function clickButton()
{
    i = i + 1
    displayButtonClickNumber()
    displayTimeSpentClicking()
}

function displayButtonClickNumber()
{
    document.getElementById("numberOfClicks").textContent = i
}

function displayTimeSpentClicking()
{
    let s = i * 0.1
    document.getElementById("timeSpentClicking").textContent = "Time spent clicking button: " + Math.floor(s) + " seconds."
}