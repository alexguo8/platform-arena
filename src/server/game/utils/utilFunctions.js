
const clamp = (val, min, max) => {
    return Math.min(Math.max(val, min), max);
}

exports.clamp = clamp;