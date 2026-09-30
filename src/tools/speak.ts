export const SPEECH_RATES = { default: 0.85, slow: 0.45 } as const;

export type SpeechRateType = keyof typeof SPEECH_RATES;

const speaker = window.speechSynthesis;

function getFirstEnglishVoice(): SpeechSynthesisVoice | null {
    const voices = speaker.getVoices();
    if (!voices || voices.length === 0) return null;

    return (
        voices.find(
            (voice) => voice.lang && voice.lang.toLowerCase().startsWith("en"),
        ) || null
    );
}

export default function speak(
    arg: string | number | null,
    rateType: SpeechRateType = "default",
    delay: number = 0,
) {
    if (!arg) return;

    speaker.cancel();

    const word = arg.toString();
    const utterance = new SpeechSynthesisUtterance(word);

    utterance.lang = "en-US";
    utterance.rate = SPEECH_RATES[rateType];

    const englishVoice = getFirstEnglishVoice();

    if (englishVoice) {
        utterance.voice = englishVoice;
    }   

    setTimeout(() => {
        speaker.speak(utterance);
    }, delay);
}
