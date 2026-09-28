const supabase = window.supabase.createClient(
    "https://hmnqssfritstinuczbrb.supabase.co",
    "sb_publishable_dUsMc7XNS73rzs8ZMjMa-w_vcOmUAoh"
)


async function getClickCount()
{
    const { data, error } = await supabase
        .from("game_counter")
        .select("clicks")
        .eq("id", 1)
        .single()
    if (error)
    {
        console.error(error)
        return
    }
    displayClickCount(data.clicks)
}


async function clickButton()
{
    const { error } = await supabase
        .rpc("increment_clicks")
    if (error)
    {
        console.error(error)
    }
}


function displayClickCount(clicks)
{
    document.getElementById("numberOfClicks").textContent = clicks
    displayTimeSpentClicking(clicks)
}


function displayTimeSpentClicking(clicks)
{
    let s = clicks * 0.135

    let hours = Math.floor(s / 3600)
    let minutes = Math.floor((s % 3600) / 60)
    let seconds = Math.floor(s % 60)

    let timeText = ""

    if (hours > 0)
    {
        timeText = hours + (hours === 1 ? " hour " : " hours ")

        if (minutes > 0)
        {
            timeText += minutes + (minutes === 1 ? " minute " : " minutes ")
        }

        if (seconds > 0)
        {
            timeText += seconds + (seconds === 1 ? " second" : " seconds")
        }
    }
    else if (minutes > 0)
    {
        timeText = minutes + (minutes === 1 ? " minute " : " minutes ")

        if (seconds > 0)
        {
            timeText += seconds + (seconds === 1 ? " second" : " seconds")
        }
    }
    else
    {
        timeText = seconds + (seconds === 1 ? " second" : " seconds")
    }

    document.getElementById("timeSpentClicking").textContent =
        "Time people have spent clicking this button: " + timeText + "."
}


supabase
    .channel("game-counter")
    .on(
        "postgres_changes",
        {
            event: "UPDATE",
            schema: "public",
            table: "game_counter"
        },
        (payload) =>
        {
            displayClickCount(payload.new.clicks)
        }
    )
    .subscribe()

getClickCount()
