import React from 'react';
import ImageCollage from './landing/ImageCollage';
import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
    const navigate = useNavigate(); 

    return (
        <div>
            <ImageCollage />
            <hr />
            <div className="text2">
                <h1>WHAT <span>WE'VE GOT</span><br/> FOR YOU</h1>
                <hr />
            </div>
            <div className="animated-text">
                <div className="item item1">
                    <img src="/static/hack.png" alt="Hackathon" />
                    <h3>Hackathons</h3>
                </div>
                <div className="item item2">
                    <img src="/static/work.png" alt="Workshop" />
                    <h3>Workshops</h3>
                </div>
                <div className="item item3">
                    <img src="/static/lect.png" alt="Lectures" />
                    <h3>Lectures</h3>
                </div>
                <div className="item item4">
                    <img src="/static/music.png" alt="Music" />
                    <h3>Music</h3>
                </div>
                <div className="item item5">
                    <img src="/static/enter.png" alt="Entertainment" />
                    <h3>Entertainment</h3>
                </div>
            </div>
            <div className='button-style'>
                <button
                    className="btn3"
                    onClick={() => navigate(`/event-list`)}
                >
                    View Available Events
                </button>
            </div>
        </div>
    );
}

export default Main;
