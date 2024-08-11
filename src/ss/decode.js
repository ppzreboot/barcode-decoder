import { BarcodeDetector } from 'barcode-detector/pure'
import { enctype_list } from './encode'

export
async function decode(file, format) {
  return await new BarcodeDetector({
    formats: [enctype_list[format][0]],
  }).detect(file)
}