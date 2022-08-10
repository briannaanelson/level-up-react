import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateGame } from "./GameManager";

export const GameEditForm = () => {
    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(false);
}