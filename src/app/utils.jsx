export const heightAdjuster = (ref) => {
    ref.current.style.height = "0px"
    const scrollHeight = ref.current.scrollHeight;
    ref.current.style.height = scrollHeight + "px";
}