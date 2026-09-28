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

    document.getElementById("numberOfClicks").textContent = data.clicks
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
            document.getElementById("numberOfClicks").textContent =
                payload.new.clicks
        }
    )
    .subscribe()

function displayTimeSpentClicking()
{
    let s = i * 0.135

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

getClickCount()
