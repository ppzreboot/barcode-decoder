import Barcode from 'jsbarcode'
import { code11, qrcode, microqrcode } from '@bwip-js/browser'

export
const enctype_list = [
  ['itf', 'itf'],

  // 'aztec',
  ['code_128', 'code128'],
  ['code_39', 'code39'],
  // 'code_93',
  ['codabar', 'codabar'],
  // 'databar',
  // 'databar_expanded',
  // 'data_matrix',
  // 'dx_film_edge',
  ['ean_13', 'ean13'],
  ['ean_8', 'ean8'],
  // 'maxi_code',
  // 'micro_qr_code',
  // 'pdf417',
  // 'qr_code',
  // 'rm_qr_code',
  ['upc_a', 'upc'],
  // 'upc_a',
  // 'linear_codes',
  // 'matrix_codes',

  ['code11', 'code11'],
  ['QR Code', 'qrcode'],
  ['Micro QR Code', 'mqrcode'],
]

export
function encode(canvas, content, format, opts) {
  try {
    format = enctype_list[format][1]
    console.log('encoding content: ', { format, content })
    
    switch(format) {
      case 'code11':
        code11(canvas, {
          text: content,
          scale: opts.width,
          height: opts.height,
          includetext: false,
          backgroundcolor: opts.background,
          barcolor: opts.lineColor,
          padding: opts.margin,
        })
        break
      case 'qrcode':
        qrcode(canvas, {
          text: content,
          scale: 1,
          backgroundcolor: opts.background,
          barcolor: opts.lineColor,
          padding: opts.margin,
        })
        break
      case 'mqrcode':
        microqrcode(canvas, {
          text: content,
          scale: 1,
          backgroundcolor: opts.background,
          barcolor: opts.lineColor,
          padding: opts.margin,
        })
        break
      default:
        Barcode(canvas, content, {
          displayValue: false,

          format,
          ...opts,
        })
        break
    }
  } catch(err) {
    console.error(err)
    return 'error on encode data'
  }
}
