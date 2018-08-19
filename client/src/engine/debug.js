import logAddEvent from './logAddEvent';
import logRemoveEvent from './logRemoveEvent';
import { getState, dispatch } from './store';
import updatePauseState from './updatePauseState';

const debugPlayer = {
    init: () => {
        dispatch({ type: 'INIT_PLAYER' });
    },
    move: (x = 1, y = 1, rotDeg = 0) => {
        const { player } = getState();

        // this is an approximate calculation
        const rot = (rotDeg / 180) * Math.PI;

        const updatedPlayer = {
            ...player,
            x,
            y,
            rotDeg,
            rot,
        };

        dispatch({ type: 'SET_PLAYER_COORDINATES', payload: updatedPlayer });
    }
};

const debugLog = {
    add: logAddEvent,
    remove: logRemoveEvent,
};

const debugPause = () => updatePauseState(true);

console.log('debug functions', {
    player: debugPlayer,
    log: debugLog,
    pause: debugPause,
});

export default () => {
    window.player = debugPlayer;
    window.log = debugLog;
    window.pause = debugPause;
};
