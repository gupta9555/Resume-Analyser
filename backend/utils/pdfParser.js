const pdfParse = require('pdf-parse');

const extractTextFromPDF = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text.replace(/\s+\n/g, '\n').trim();
};

module.exports = { extractTextFromPDF };
