import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/** PDF זמני כשאין קובץ ב־public/ — מונע 404 בקישורי ההורדה */
export async function buildPlaceholderPdf(
  title: string,
  lines: string[],
): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  let y = 780;
  page.drawText(title, {
    x: 50,
    y,
    size: 16,
    font,
    color: rgb(0.05, 0.12, 0.22),
  });
  y -= 36;
  for (const line of lines) {
    page.drawText(line, {
      x: 50,
      y,
      size: 10,
      font,
      color: rgb(0.2, 0.28, 0.38),
      maxWidth: 495,
      lineHeight: 14,
    });
    y -= 22;
  }
  return Buffer.from(await doc.save());
}
