function serialize(arr) {
    if (arr.length > 1000) throw new Error("Array too long");
    let bits = arr.length.toString(2).padStart(16, '0');
    for (const num of arr) {
        bits += (num - 1).toString(2).padStart(9, '0');
    }
    const paddedBits = bits.padEnd(Math.ceil(bits.length / 8) * 8, '0');
    const bytes = [];
    for (let i = 0; i < paddedBits.length; i += 8) {
        bytes.push(parseInt(paddedBits.substr(i, 8), 2));
    }
    return Buffer.from(bytes).toString('base64');
}

function deserialize(str) {
    const bytes = Buffer.from(str, 'base64');
    let bits = '';
    for (const byte of bytes) bits += byte.toString(2).padStart(8, '0');
    const length = parseInt(bits.substr(0, 16), 2);
    bits = bits.substr(16);
    const arr = [];
    for (let i = 0; i < length * 9; i += 9) {
        const chunk = bits.substr(i, 9);
        if (!chunk) break;
        arr.push(parseInt(chunk, 2) + 1);
    }
    return arr;
}
