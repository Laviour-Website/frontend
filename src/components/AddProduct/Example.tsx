import Select, { StylesConfig } from "react-select";
import chroma from "chroma-js";

interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
export const colourOptions: ColourOption[] = [
  // { value: 'ocean', label: 'Ocean', color: '#00B8D9'},
  // { value: 'blue', label: 'Blue', color: '#0052CC' },
  // { value: 'purple', label: 'Purple', color: '#5243AA' },
  // { value: 'red', label: 'Red', color: '#FF5630' },
  // { value: 'orange', label: 'Orange', color: '#FF8B00' },
  // { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  // { value: 'green', label: 'Green', color: '#36B37E' },
  // { value: 'forest', label: 'Forest', color: '#00875A' },
  // { value: 'slate', label: 'Slate', color: '#253858' },
  // { value: 'silver', label: 'Silver', color: '#666666' },

  { value: "black", label: "Black", color: "#000" },
  { value: "grey", label: "Grey", color: "#808080" },
  { value: "grey", label: "Light Grey", color: "#bbc2cc" },
  { value: "white", label: "white", color: "#fff" },
  { value: "brown", label: "Dark Brown", color: "#5d4037" },
  { value: "brown", label: "Brown", color: "#964b00" },
  { value: "brown", label: "Light Brown", color: "#b5651d" },
  { value: "blue", label: "Navy Blue", color: "#00008b" },
  { value: "blue", label: "Blue", color: "#0000ff" },
  { value: "light-blue", label: "Light Blue", color: "#3cdfff" },
  { value: "light-blue", label: "Cyan", color: "#01ffff" },
  { value: "light-blue", label: "Baby Blue", color: "#87cdee" },
  { value: "purple", label: "Violet", color: "#4b0082" },
  { value: "purple", label: "Purple", color: "#8a00c2" },
  { value: "pink", label: "Lavender", color: "#d7b4f3" },
  { value: "pink", label: "Pink", color: "#fe019a" },
  { value: "pink", label: "Magenta", color: "#ff00ff" },
  { value: "pink", label: "Baby Pink", color: "#f8c8dc" },
  { value: "red", label: "Maroon", color: "#800000" },
  { value: "red", label: "Red", color: "#dd1717" },
  { value: "red", label: "Light Red", color: "#ff7276" },
  { value: "dark-green", label: "Olive", color: "#808000" },
  { value: "dark-green", label: "Dark Green", color: "#2e8b57" },
  { value: "green", label: "Green", color: "#3cb043" },
  { value: "green", label: "Neon Green", color: "#39ff14" },
  { value: "green", label: "Light Green", color: "#90ee90" },
  { value: "yellow", label: "Lime Green", color: "#c7ea46" },
  { value: "yellow", label: "Mustard", color: "#e1ad01" },
  { value: "yellow", label: "Yellow", color: "#ffec19" },
  { value: "yellow", label: "Yellow", color: "#ffffa7" },
  { value: "orange", label: "Orange", color: "#ed7014" },
  { value: "orange", label: "Light Orange", color: "#ffb74d" },
  { value: "peach", label: "Mauve", color: "#bd9596" },
  { value: "peach", label: "Peach", color: "#ffcba4" },
  { value: "peach", label: "Nude", color: "#f2d3bc" },
  { value: "peach", label: "Beige", color: "#e1c699" },
  { value: "white", label: "Off white", color: "#f4f0dd" },
  { value: "peach", label: "Cream", color: "#fffdd0" },
];

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 20,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 20,
    width: 50,
  },
});

export const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(1).css()
        : undefined,

      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(1).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};
