export default function NumberInput() {
    return (
        <input
            placeholder="Type your guess"
            name="answer"
            type="number"
            required
            className="bg-base-050 font-pally font-semibold rounded-lg text-lg text-base-900 active:text-base-900 focus:text-base-900 border-2 border-transparent active:border-base-900 focus:border-base-900 placeholder:text-base-200 pl-3 pr-3 pt-2 pb-2 drop-shadow-xs"
        />
    );
}
