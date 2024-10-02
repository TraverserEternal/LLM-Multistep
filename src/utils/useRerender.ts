import { useState } from "preact/hooks";

export const useRerender = () => {
	const [on, setOn] = useState(false); // This is arbitrary, we just need to make sure that the state is changed in some way
	return () => setOn(!on);
};
