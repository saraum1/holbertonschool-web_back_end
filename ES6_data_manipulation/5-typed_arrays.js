/**
 * Creates an Int8 Typed Array within an ArrayBuffer.
 * @param {Number} length - The length of the buffer.
 * @param {Number} position - The index to insert the value.
 * @param {Number} value - The Int8 value to insert.
 * @returns {DataView} A view of the buffer.
 * @throws {Error} If the position is outside the range of the buffer.
 */
export default function createInt8TypedArray(length, position, value) {
  // Check if position is within the bounds of the length
  if (position < 0 || position >= length) {
    throw new Error('Position outside range');
  }

  // Create the buffer of the specified length
  const buffer = new ArrayBuffer(length);
  // Create a DataView to manipulate the buffer
  const view = new DataView(buffer);

  // Set the Int8 value at the specified position
  view.setInt8(position, value);

  return view;
}
