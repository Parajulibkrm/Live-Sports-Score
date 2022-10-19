import axios from "axios";
import { Event } from "../../types";
const payload = [{
	"type": "SIMULATION STARTED",
	"comment": "Simulation started, you will see new match event every minute",
	"matchTimeStamp": "0",
	"team1": "22hyf3b3ucwz",
	"team2": "d33s7lm0jkb5"
}, {
	"type": "FOUL",
	"comment": "Foul by player number 10",
	"timeStamp": `${Date.now()}`,
	"matchTimeStamp": "1",
	"team1": "22hyf3b3ucwz"
}, {
	"type": "GOAL",
	"comment": "And that was a brilliant goal by Alexandar",

	"matchTimeStamp": "2",
	"team1": "22hyf3b3ucwz",
	"player1": "tj7fcx4shu9o",
	"player2": "lvmmhyiugkac"
	// "team1": "22hyf3b3ucwz"
}, {

	"type": "GOAL",
	"comment": "And that was a brilliant goal by Oleksandr",

	"matchTimeStamp": "5",
	"player1": "tj7fcx4shu9o",
	"team1": "22hyf3b3ucwz",
	"player2": "lvmmhyiugkac"

	// "team1": "22hyf3b3ucwz"

}]

const getPayload = (counter: number) => {
	return payload[counter] || payload[Math.floor(Math.random() * payload.length) + 1]
}

const startSimulation = async () => {
	await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/match/test/event`)
	let counter = 0;
	await axios.post(`${import.meta.env.VITE_BACKEND_URL}/match/test/event`, getPayload(counter))
	setInterval(async () => {
		if (++counter > 90) return
		await axios.post(`${import.meta.env.VITE_BACKEND_URL}/match/test/event`, { ...payload[counter], "timeStamp": `${Date.now()}`, })
	}, 20000)
}
export default startSimulation;