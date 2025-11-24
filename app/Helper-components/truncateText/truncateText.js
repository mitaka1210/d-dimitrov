// components/TruncateText.js
const TruncateText = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
};

export default TruncateText;