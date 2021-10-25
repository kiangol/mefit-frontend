import React, {useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {create} from '../../api/ProfileAPI';
import KeycloakService from "../../services/KeycloakService";
import {useHistory} from "react-router-dom";
import ProfileQuestionnaire from "./ProfileQuestionnaire";

const ProfileForm = () => {

    const history = useHistory();

    const [profile, setProfile] = useState({
        username: KeycloakService.getUsername(),
        weight: '',
        height: '',
        medicalConditions: '',
        disabilities: '',
        fitnessScore: '',
    });
    const [totalScore, setTotalScore] = useState(5*9);

    const [answers, setAnswers] = useState( {
        q1: "5",
        q2: "5",
        q3: "5",
        q4: "5",
        q5: "5",
        q6: "5",
        q7: "5",
        q8: "5",
        q9: "5"
    })

    const onNewProfileChange = event => {
        let fitness = profile["fitnessScore"];
        let bmi = 0;
        if (event.target.id == "weight" && profile["height"] != "") {
            bmi = event.target.value / profile["height"] / profile["height"] * 10000;
            if (bmi < 25) {
                setTotalScore(totalScore + 20);
            } else if (bmi < 30) {
                setTotalScore(totalScore + 15);
            } else if (bmi < 35) {
                setTotalScore(totalScore + 10);
            } else {
                setTotalScore(totalScore + 5);
            }
            fitness = calculateFitness();
        } else if (event.target.id == "height" && profile["weight"] != "") {
            bmi = profile["weight"] / event.target.value / event.target.value * 10000;
            if (bmi < 25) {
                setTotalScore(totalScore + 20);
            } else if (bmi < 30) {
                setTotalScore(totalScore + 15);
            } else if (bmi < 35) {
                setTotalScore(totalScore + 10);
            } else {
                setTotalScore(totalScore + 5);
            }
            fitness = calculateFitness();
        }
        setProfile({
            ...profile,
            [event.target.id]: event.target.value,
            ["fitnessScore"]: fitness
        });
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();
        await create(profile);
        alert('Profile created');
        window.location.reload(false);
    };

    const handleSelectChange = event => {
        setTotalScore(totalScore + (event.target.value - answers[event.target.className]));
        let fitness = calculateFitness()
        setProfile({
            ...profile,
            ["fitnessScore"]: fitness
        });
        setAnswers({
            ...answers,
            [event.target.className]: event.target.value
        });
    };

    const calculateFitness = () => {
        let fitness = 0;
        if (totalScore < 70) {
            fitness = 1;
        } else if (totalScore <= 100) {
            fitness = 2;
        } else if (totalScore <= 130) {
            fitness = 3;
        } else if (totalScore <= 170) {
            fitness = 4;
        } else {
            fitness = 5
        }
        return fitness;

    }



    return (

        <>
            <form onSubmit={onFormSubmit}>
                <div className="form-group col-md-4">

                    <label htmlFor="height">Height</label>
                    <input type="number"
                           required
                           className="form-control"
                           id="height"
                           placeholder="Height in cm"
                           onChange={onNewProfileChange}
                    />
                    <label htmlFor="weight">Weight</label>
                    <input type="number"
                           required
                           className="form-control"
                           id="weight"
                           placeholder="Weight in kg"
                           onChange={onNewProfileChange}
                    />
                    <label htmlFor="disabilities">Disabilities</label>
                    <input type="text"
                           className="form-control"
                           id="disabilities"
                           placeholder="Disabilities, separated by comma"
                           onChange={onNewProfileChange}
                    />
                    <label htmlFor="medicalConditions">Medical conditions</label>
                    <input type="text"
                           className="form-control"
                           id="medicalConditions"
                           placeholder="Medical conditions, separated by comma"
                           onChange={onNewProfileChange}
                    />
                    <br/>
                    <p>How many days a week to you do some form of exercise?</p>
                    <select className="q1" onChange={handleSelectChange}>
                        <option value="5">None</option>
                        <option value="10">1 or 2 days</option>
                        <option value="15">3 to 5 days</option>
                        <option value="20">6 or more</option>
                    </select>
                    <br/>
                    <br/>
                    <p>Can you touch your toes?</p>
                    <select className="q2" onChange={handleSelectChange}>
                        <option value="5">Not even close</option>
                        <option value="10">Nearly</option>
                        <option value="15">Just</option>
                        <option value="5">Easily</option>
                    </select>
                    <br/>
                    <br/>
                    <p>Could you walk along a straight line, like the "Walk and Turn" field sobriety test?</p>
                    <select className="q3" onChange={handleSelectChange}>
                        <option value="5">Fail miserably</option>
                        <option value="10">I would step off the line a few times</option>
                        <option value="15">I might wobble a bit but I'd make it</option>
                        <option value="20">No problem, give me a drink!</option>
                    </select>
                    <br/>
                    <br/>
                    <p>If you went out for a jog, how far do you think you could go before you had to stop for a rest?</p>
                    <select className="q4" onChange={handleSelectChange}>
                        <option value="5">I wouldn't make it to the mailbox</option>
                        <option value="10">To the end of the block</option>
                        <option value="15">About a kilometer or mile</option>
                        <option value="20">A long way</option>
                    </select>
                    <br/>
                    <br/>
                    <p>How many push-ups do you think you could do?</p>
                    <select className="q5" onChange={handleSelectChange}>
                        <option value="5">None</option>
                        <option value="10">A few</option>
                        <option value="15">Many</option>
                        <option value="20">Heaps</option>
                    </select>
                    <br/>
                    <br/>
                    <p>How would you go if you had to move some HEAVY furniture around the house?</p>
                    <select className="q6" onChange={handleSelectChange}>
                        <option value="5">I'd be no help</option>
                        <option value="10">I'd pitch in but need a few helpers</option>
                        <option value="15">I could carry one end of it myself</option>
                        <option value="20">I could possibly do it myself</option>
                    </select>
                    <br/>
                    <br/>
                    <p>What could you jump over?</p>
                    <select className="q7" onChange={handleSelectChange}>
                        <option value="5">Nothing</option>
                        <option value="10">A shoe box</option>
                        <option value="15">A low fence</option>
                        <option value="20">A high hurdle</option>
                    </select>
                    <br/>
                    <br/>
                    <p>If you had your purse/wallet stolen, would you be able to chase down the robber?</p>
                    <select className="q8" onChange={handleSelectChange}>
                        <option value="5">No way</option>
                        <option value="10">I'd give it a go but probably not</option>
                        <option value="15">I could catch the thief but possibly not overpower them</option>
                        <option value="20">Easily</option>
                    </select>
                    <br/>
                    <br/>
                    <p>Confronted with a flight of stairs, would you ...?</p>
                    <select className="q9" onChange={handleSelectChange}>
                        <option value="5">Choose the lift every time</option>
                        <option value="10">Walk up, but be out of breath</option>
                        <option value="15">Stride up, but still be out of breath</option>
                        <option value="20">Race up several flights no problem</option>
                    </select>
                </div>
                <br/>
                <button type={"submit"} className={"btn btn-primary btn-lg"}>Create</button>
            </form>
        </>
    );
};

export default withKeycloak(ProfileForm);