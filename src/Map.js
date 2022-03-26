import { useState, useCallback } from 'react';

import Race from './Race';
import SettingsPanel from './SettingsPanel';

import raceData from './races';

function Map(props) {
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [showNames, setShowNames] = useState(false);
    const [showGates, setShowGates] = useState(false);
    const [showStanding, setShowStanding] = useState(false);
    const [showAffinity, setShowAffinity] = useState(false);

    const startDragging = useCallback(() => setDragging(true),[]);
    const stopDragging = useCallback(() => setDragging(false),[]);
    const handleMouseMove = useCallback(
        (event) => {
            if (dragging) {
                setOffset(
                    {
                        x: offset.x + event.movementX / zoom,
                        y: offset.y + event.movementY / zoom
                    }
                )
            }
        },
        [dragging, offset, zoom]
    );
    const handleWheel = useCallback(
        (event) => {
            const sensitivity = 0.002;
            const minZoom = 0.5;
            const maxZoom = 3;
            const delta = -event.deltaY * sensitivity
            setZoom(Math.max(Math.min(zoom + delta, maxZoom),minZoom))
        },
        [zoom]
    )

    const races = raceData.map(r =>
        <Race
            key={r.name}
            x={r.x}
            y={r.y}
            name={r.name}
            gates={r.gates}
            standing={r.standing}
            affinity={r.affinity}
            scale={1 / zoom}
            {...{showNames, showGates, showStanding, showAffinity}}
        />
    );
    const mapStyle = {
        transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
    }
    return (
        <main 
            className="map-container"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
        >
            <div className="map" style={mapStyle}> {races} </div>
            <SettingsPanel
                {
                ...{showNames,
                    showGates,
                    showStanding,
                    showAffinity,
                    setShowNames,
                    setShowGates,
                    setShowStanding,
                    setShowAffinity}
                }
            />
        </main>
    );
}

export default Map;