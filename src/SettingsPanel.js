import { useCallback, useState } from "react";

function SettingsPanel(props) {
    const [opened, setOpened] = useState(false);
    const toggleOpened = useCallback(
        () => setOpened(!opened),
        [opened]
    );
    const panelStyle = {
        transform: `translateX(${opened ? '0' : '-101'}%)`,
    }
    return (
        <div className="settings-panel" style={panelStyle}>
            <button type="button" className="settings-toggle" onClick={toggleOpened}>{opened ? '<' : '>'}</button>
            <label className="settings-option">
                <input type="checkbox" value={props.showNames} onChange={(e) => {props.setShowNames(e.target.checked)}}></input>
                Names
            </label>
            <label className="settings-option">
                <input type="checkbox" value={props.showGates} onChange={(e) => {props.setShowGates(e.target.checked)}}></input>
                Gate count
            </label>
            <label className="settings-option">
                <input type="checkbox" value={props.showStanding} onChange={(e) => {props.setShowStanding(e.target.checked)}}></input>
                Standing
            </label>
            <label className="settings-option">
                <input type="checkbox" value={props.showAffinity} onChange={(e) => {props.setShowAffinity(e.target.checked)}}></input>
                Affinity
            </label>
        </div>
    );
}

export default SettingsPanel;