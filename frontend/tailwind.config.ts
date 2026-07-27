const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

function divider({ addUtilities, e, config }) {
  const widths = {
    0: "0",
    2: "2px",
  };

  const colors = config("theme.borderColor");

  const vr = Object.entries(widths).map(([k, v]) => ({
    [`.vr-${e(k)}`]: {
      borderLeft: `${v} solid`,
    },
  }));
  vr.push({
    ".vr": {
      borderLeft: `1px solid ${colors.default}`,
    },
  });

  const vrColors = Object.entries(colors).reduce((acc, [color, v]) => {
    if (typeof v === "string") {
      acc.push({
        [`.vr-${e(color)}`]: {
          borderColor: v,
        },
      });
    } else {
      Object.entries(v).forEach(([k, v]) =>
        acc.push({
          [`.vr-${e(color)}-${k}`]: {
            borderColor: v,
          },
        })
      );
    }

    return acc;
  }, []);

  addUtilities(vr.concat(vrColors));
}

function stack({ addUtilities, e, variants, config }) {
  const spacing = config("theme.spacing");
  const stacks = Object.keys(spacing).map((k) => ({
    [`.vstack-${e(k)} > * + *`]: {
      marginTop: spacing[k],
    },
    [`.hstack-${e(k)} > *`]: {
      marginRight: spacing[k],
    },
  }));
  stacks.push({
    ".vstack": {
      display: "flex",
      flexDirection: "column",
    },
  });
  stacks.push({
    ".hstack": {
      display: "flex",
      ":last-child": {
        marginRight: 0,
      },
    },
  });

  addUtilities(stacks, variants("stack"));
}

function gradients({ addUtilities, theme, e, variants }) {
  const config = theme("gradients", {});
  const colors = theme("colors", {});
  const angles = {
    45: "45deg",
    60: "60deg",
    75: "75deg",
    90: "90deg",
    105: "105deg",
    120: "120deg",
    135: "135deg",
  };

  function getColor(keyOrCode) {
    return colors[keyOrCode] || keyOrCode;
  }

  const utilities = Object.keys(angles).map((key) =>
    Object.entries(config).map(([color, [start, end]]) => ({
      [`.bg-gradient-${e(key)}-${e(color)}`]: {
        backgroundImage: `linear-gradient(${angles[key]}, ${getColor(
          start
        )} 63%, ${getColor(end)} 100%)`,
      },

      [`.bg-gradient-0-${e(key)}-${e(color)}`]: {
        backgroundImage: `linear-gradient(${angles[key]}, ${getColor(
          start
        )} 0%, ${getColor(end)} 100%)`,
      },

      [`.bg-gradient-0-reverse-${e(key)}-${e(color)}`]: {
        backgroundImage: `linear-gradient(${angles[key]}, ${getColor(
          end
        )} 0%, ${getColor(start)} 100%)`,
      },
    }))
  );

  addUtilities(utilities, variants("gradients"));
}

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ['"Proxima Nova"'],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem", // 14
      base: "1rem", // 16
      lg: "1.125rem", // 18
      xl: "1.25rem", // 20
      "2xl": "1.5rem", // 24
      "3xl": "1.75rem", // 28
      "4xl": "2.25rem", // 36
      "5xl": "2.5rem", // 40
      huge: "3.75rem", // 60
    },
    lineHeight: {
      ...defaultTheme.lineHeight,
      none: "1rem",
      some: "1.125rem", // 18
      tight: "1.250rem", //20
      snug: "1.375rem", // 22
      normal: "1.5rem", // 24
      relaxed: "1.625rem", // 26
      "relaxed-2": "1.875rem", // 30
      loose: "2.125rem", //34

      12: "3rem", // 48
      13: "3.25rem", // 52
    },
    gradients: {
      "primary-light": ["primary-light", "primary-lighter"],
      "primary-dark": ["primary-dark", "primary-darker"],
      cta: ["primary-dark", "primary-light"],
      modal: ["#294AED", "primary-lighter"],
      "h-primary-light": ["h-primary-light", "h-primary-lighter"],
      "h-primary-dark": ["h-primary-dark", "h-primary-darker"],
      "primary-soft": ["primary-soft", "primary-softer"],
      "h-primary-soft": ["primary-softer", "light"],
    },
    extend: {
      zIndex: {
        "-10": -10,
        "-20": -10,
        "-30": -10,
      },
      gridTemplateRows: {
        "7": "repeat(8, minmax(0, 1fr))",
      },
      colors: {
        black: "#34323E",
        dark: "#34323E",
        // 'dark-2': '#717181',
        "dark-soft": "#A4A9B7",
        "dark-softer": "#C3C7D6",
        light: "#E9ECF4",
        "light-soft": "#F2F5FC",
        "light-softer": "#F9FAFE",
         white: "#FFFFFF",
        "primary-light": "#1968FF",
        "primary-lighter": "#18A3FA",
        "primary-soft": "#C0DAFF",
        "primary-softer": "#CDe0FB",
        "primary-dark": "#1454CE",
        "primary-darker": "#0621B7",
        "green-light": "#43e8db",
        red: "#FC1F5A",
        yellow: "#FDEC5E",

        "graph-1": "#7CA9FF",
        "graph-2": "#9EE8EE",
        "graph-3": "#6876D7",
        "graph-4": "#79C9FC",

        danger: "#FC1F5A",
        warning: "#FFE629",
        info: "#04E0CF",
        "h-primary-light": "#0048D1",
        "h-primary-lighter": "#0085D8",
        "h-primary-dark": "#083C9F",
        "h-primary-darker": "#031781",
        "h-primary-soft": "#A7CBFD",
        "h-info": "#00BAAC",
        "h-warning": "#FFE629",
        "h-danger": "#D9003A",
        primaryPurple: "#8072FF",
        PrimaryBlue:"#2A7AFF",
        gradientpurplelight:"#A8A6FC"
      },
      spacing: {
        7: "1.75rem",
        9: "2.25rem",
        14: "3.5rem",
        28: "7rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        60: "15rem",
        72: "18rem",
        80: "20rem",
        84: "21rem",
        88: "22rem",
        92: "23rem",
        96: "24rem",
        100: "25rem",
        108: "27rem",
        116: "29rem",
        124: "31rem",
        132: "33rem",
        140: "35rem",
        148: "37rem",
        160: "40rem",
        180: "42rem",
        188: "44rem",
        200: "50rem",
        216: "54rem",
        232: "58rem",
        256: "64rem",
      },
      height: {
        "landing-top": "91.25rem",
        "looking-for-job-top": "81.25rem",
      },
      transitionProperty: {
        width: "width",
      },
      screens: {
        "sm-h": { raw: "(max-height: 900px)" },
        xl: "1280px",
        "2lg": "1128px",
        xxl: "1400px",
      },
      maxHeight: {
        "64": "16rem",
        "76": "19rem",
        "128": "32rem",
        "160": "40rem",
      },
      minWidth: {
        "0": "0",
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      maxWidth: {
        "3xs": "12rem",
        "2xs": "16rem",
        "0": "0",
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      strokeWidth: {
        "3": "3",
        "4": "4",
      },
    },
    customForms: (theme) => ({
      default: {
        "input, textarea, select": {
          borderRadius: "4px",
          backgroundColor: theme("colors.white"),
          color: theme("colors.dark"),
          borderColor: theme("borderColor.dark-soft"),

          "&::placeholder": {
            color: theme("colors.dark-softer"),
            fontFamily: "Proxima Nova",
          },

          "&:hover:not(:focus)": {
            borderColor: theme("colors.dark"),
          },
          "&:focus": {
            boxShadow: "none",
            borderColor: theme("colors.primary-light"),
          },
        },
        textarea: {
          minHeight: "calc(theme(lineHeight.tight) + 0.75rem + 0.5rem)",
        },
        checkbox: {
          "[checked]": {
            backgroundColor: theme("colors.primary"),
          },
        },
        radio: {
          "[checked]": {
            backgroundColor: theme("colors.primary"),
          },
        },
      },
    }),
  },
  variants: {
    gradients: ["responsive", "hover", "focus"],
    stack: ["responsive"],
    width: ["responsive", "hover"],
  },
  plugins: [
    plugin(divider),
    plugin(stack),
    plugin(gradients),
    require('@tailwindcss/forms'),
    //require("@tailwindcss/custom-forms"),
  ],
};
