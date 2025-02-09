import React, { useReducer } from "react";
import { PLAYERS } from "../../constants/players";
import PlayerForm from "./PlayerForm";
import PlayerInfo from "./PlayerInfo";
import BattleResult from "./BattleResult";
import Button from "../Button";

const initialState = {
  players: PLAYERS.map((player) => ({ ...player, data: null, error: null })),
  battleStarted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PLAYER_DATA":
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id
            ? { ...player, data: action.payload.data, error: null }
            : player
        ),
      };
    case "SET_PLAYER_ERROR":
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id
            ? { ...player, error: action.payload.error }
            : player
        ),
      };
    case "START_BATTLE":
      return { ...state, battleStarted: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Battle() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (id, username) => {
    try {
      if (!username) {
        throw new Error("Username cannot be empty.");
      }

      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error("Username not found.");
      }
      const userData = await userResponse.json();

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories.");
      }
      const reposData = await reposResponse.json();

      const stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

      dispatch({
        type: "SET_PLAYER_DATA",
        payload: { id, data: { ...userData, stars } },
      });
    } catch (error) {
      dispatch({ type: "SET_PLAYER_ERROR", payload: { id, error: error.message } });
    }
  };

  const handleReset = (id) => {
    dispatch({ type: "SET_PLAYER_DATA", payload: { id, data: null } });
  };

  const handleBattle = () => {
    dispatch({ type: "START_BATTLE" });
  };

  const handleRestart = () => {
    dispatch({ type: "RESET" });
  };

  const allPlayersHaveData = state.players.every((player) => player.data);

  if (state.battleStarted) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Battle Results</h1>
        <BattleResult
          players={state.players.map((player) => player.data)}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Let's Get Ready to Rumble 🥊</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "2em" }}>
        {state.players.map((player) =>
          player.data ? (
            <PlayerInfo
              key={player.id}
              player={player.data}
              onReset={() => handleReset(player.id)}
              showReset={!state.battleStarted}
            />
          ) : (
            <PlayerForm
              key={player.id}
              player={player}
              onSubmit={(username) => handleSubmit(player.id, username)}
              error={player.error}
            />
          )
        )}
      </div>
      {allPlayersHaveData && !state.battleStarted && (
        <Button title="Battle!" handleClick={handleBattle} />
      )}
    </div>
  );
}