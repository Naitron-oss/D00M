import { getState, dispatch } from './store';
import updateAutomap from './updateAutomap';
import clearSprites from './clearSprites';
import castRays from './castRays';
import renderSprites from './renderSprites';
import renderEnemies from './renderEnemies';
import updateFPS from './updateFPS';

const renderCycle = () => {
    const {
        gameCycle: {
            delay,
            lastRender,
        },
        automap: {
            showAutomap,
            showViewingCone,
        },
    } = getState();

    if (delay <= 0) {
        console.error('Invalid value: gameCycle.delay should be a number greater than zero.');
        return false;
    }

    updateAutomap();
    
    if (!showAutomap || (showAutomap && showViewingCone)) {
        castRays();
    }
    if (!showAutomap) {
        clearSprites();
        renderSprites();
        renderEnemies();
    }

	// time since last rendering
	const now = new Date().getTime();
	const timeDelta = now - lastRender;
	let cycleDelay = delay;
	if (timeDelta > cycleDelay) {
		cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
    }
    
    dispatch({ type: 'SET_LAST_RENDER_CYCLE_TIME', payload: now });

    setTimeout(renderCycle, cycleDelay);
    
    updateFPS(timeDelta);
};

export default renderCycle;
