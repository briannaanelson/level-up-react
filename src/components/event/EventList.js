import React, { useEffect, useState } from "react";
import { getEvents} from "./EventManager.js";
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const [ games, setGames ] = useState([])
    const history = useHistory();

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/events/new" })
                        }}
                        >Add New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event_game">{event.game} is {event.description}</div>
                        <div className="event_date">Event will take place on{event.date} at {event.time} by {event.organzier}</div>
                    </section>
                })
            }
        </article>
    )
}