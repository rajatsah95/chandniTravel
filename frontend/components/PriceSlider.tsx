// export default function PriceSlider() {
//   return <div>Price Slider Component</div>;
// }

"use client";

interface Props {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export default function PriceSlider({ min, max, value, onChange }: Props) {
  return (
    <div style={{ marginTop: 10 }}>
      <label>Max Price: ₹{value}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}