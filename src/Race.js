import { useCallback, useState, useEffect } from "react";

function Race(props) {
    const styles = {
        left: `${props.x}%`,
        top: `${props.y}%`,
        transform: `scale(${props.scale})`,
    }

    const [completed, setCompleted] = useState(localStorage.getItem(props.name) === 'true');

    useEffect(() => {
        localStorage.setItem(props.name, completed);
    }, [completed, props.name]);

    const handleClick = useCallback(() => {
        setCompleted(!completed);
    }, [completed]);

    return (
        <div className="race-container" style={styles}>
            { (props.showNames || props.showGates || props.showStanding || props.showAffinity) &&
            <div className="race-info">
                { props.showNames &&
                <h4>{props.name}</h4> }
                <table>
                    <tbody>
                        { props.showGates &&
                        <tr>
                            <th>Gates</th>
                            <td>{props.gates}</td>
                        </tr> }
                        { props.showStanding &&
                        <tr>
                            <th>Standing</th>
                            <td>{props.standing}</td>
                        </tr> }
                        { props.showAffinity &&
                        <tr>
                            <th>Affinity</th>
                            <td>{props.affinity}</td>
                        </tr> }
                    </tbody>
                </table>
            </div> }
            <div className={`race-icon${completed ? ' completed' : ''}`} onClick={handleClick}></div>
        </div>
    )
}

export default Race;