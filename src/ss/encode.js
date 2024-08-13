import Barcode from 'jsbarcode'

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
]

export
function encode(canvas, content, format, opts) {
  try {
    console.log('encoding content: ', { format, content })
    Barcode(canvas, content, {
      displayValue: false,

      format: enctype_list[format][1],
      ...opts,
    })
  } catch(err) {
    console.error(err)
    return 'error on encode data'
  }
}
