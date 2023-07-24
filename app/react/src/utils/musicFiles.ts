/****/
/****/ // Import assets here
/****/


// Array to store active audio instances
const audioInstances: HTMLAudioElement[] = [];

// FIXME: Initial global volume | Attatch to Redux
let globalVolume = 0.5;

/**
 * Play a music track.
 * @param musicName - The name of the music track to play.
 * @returns A function to stop the music when called.
 */
export const playMusic = (musicName: string): (() => void) => {
    const audio = new Audio(musicFiles[musicName]);
    audio.loop = true;
    audio.volume = globalVolume;
    audio.play();
    audioInstances.push(audio);

    // Return a function to stop the music when called
    return () => {
        audio.loop = false;
        audio.pause();
        audioInstances.splice(audioInstances.indexOf(audio), 1);
    };
};

/**
 * Stop all currently playing music tracks.
 */
export const stopAllMusic = (): void => {
    audioInstances.forEach((audio) => {
        audio.loop = false;
        audio.pause();
    });
    audioInstances.length = 0;
};

/**
 * Set the global volume for all music tracks.
 * @param volume - The volume value (between 0 and 1).
 */
export const setGlobalVolume = (volume: number): void => {
    // Clamp the volume value between 0 and 1
    globalVolume = Math.min(Math.max(volume, 0), 1);

    // Update the volume for all active audio instances
    audioInstances.forEach((audio) => {
        audio.volume = globalVolume;
    });
};

/****/
/****/ // Define Music Files here
/****/
export const musicFiles: Record<string, string> = {
    // sample: sample,
};
