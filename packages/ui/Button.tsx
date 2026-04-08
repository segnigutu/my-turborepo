export const Button = ({ text }: { text: string }) => {
  return (
    <button style={{ padding: "10px", background: "black", color: "white" }}>
      {text}
    </button>
  );
};