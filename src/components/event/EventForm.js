import react, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewEvent } from './EventManager.js'
import { getGames } from "../game/GameManager.js";
import { createEvent } from "@testing-library/react";

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])


    const [currentEvent, setCurrentEvent] = useState({
        game : 1,
        description: "",
        date: "",
        time: "",
        organizer: 1,
    })
    
    useEffect(() => {
        getGames().then(setGames)
    }, [])

    const changeEventState = (domEvent) => {

        const newEvent = { ...currentEvent}
        let selectedVal = domEvent.target.value

        if (domEvent.target.name.includes("Id")){
            selectedVal = parseInt(selectedVal)
        }

        newEvent[domEvent.target.name] = selectedVal

        setCurrentEvent(newEvent)
    }

    return(
        <form className="eventForm">
            <h2 className="eventForm_title">Add New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game:</label> 
                    <select value={currentEvent.game} name="game" onChange={changeEventState} className="form-control">
                       <option value="0">Select a Game</option>
                       {games.map(l => (
                           <option key={l.id} value={l.id}>
                               {l.title}
                           </option>
                       ))} 
                    </select>
                    </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        defaultValue={currentEvent.description}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        defaultValue={currentEvent.date}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        defaultValue={currentEvent.time}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer:</label>
                    
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    console.log(currentEvent)

                    const event = {
                        game: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        organizer: parseInt(currentEvent.organizer)
                    }
                    createNewEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}

