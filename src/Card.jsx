import { useState, useEffect } from "react";
import "./Card.css";

const Card = ({avatarmedium, personaname, rank_tier}) => {

    const rankTier = rank_tier || 0;
    const rankGroup = Math.floor(rankTier / 10); // Medalla (1-8)
    const rankStar = rankTier % 10; // Estrellas (1-5)

    return (
        <div className="card">
            <div className="card-title">
                <img className="card-avatar" src={avatarmedium} alt="Avatar" />
                <div className="rankMedal" data-hint={`Rank ${rankGroup} [${rankStar}]`} data-hint-position="top">
                    <img className="rankMedal-icon"
                        src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${rankGroup}.png`}
                        alt="Ranked medal icon" />
                    {rankStar > 0 && (
                        <img className="rankMedal-star"
                            src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${rankStar}.png`}
                            alt="Ranked medal stars" />
                    )}
                </div>
            </div>
            <div className="card-content">
                <h1 className="card-personaname">{personaname}</h1>
                <h2 className="card-rank_tier">{rank_tier}</h2>
            </div>
        </div>
    );
};

export default Card;