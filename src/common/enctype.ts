export
enum Enctype {
  /** Interleaved Two of File. [0~9] */
  ITF = 1,
  /** [0~9, -] */
  code11,
  /** [0~9, A, B, C, D, -, $, /, ., +] (19 in total) */
  codabar,
  /** [0~9, A~Z, 7 chars] (43 in total) (naming: a char is represented by 9 bars including 3 bold bars) */
  code39,
  /** 128 ASCII codes. */
  code128,

  /** Universal Product Code - Additional. */
  UPC_A,
  /** Universal Product Code - Efficient. */
  UPC_E,
  /** Europe Article Number (8 bits). */
  EAN8,
  /** Europe Article Number (13 bits). */
  EAN13,
}

export
const enctype_num = 9

export
const enctype_list: readonly Enctype[] = [
  Enctype.ITF,
  Enctype.code11,
  Enctype.codabar,
  Enctype.code39,
  Enctype.code128,
  Enctype.EAN8,
  Enctype.EAN13,
  Enctype.UPC_A,
  Enctype.UPC_E,
]

export
const enctype_name_map: Record<Enctype, string> = {
  [Enctype.ITF]: 'ITF',
  [Enctype.code11]: 'Code 11',
  [Enctype.codabar]: 'Codabar',
  [Enctype.code39]: 'Code 39',
  [Enctype.code128]: 'Code 128',
  [Enctype.EAN8]: 'EAN 8',
  [Enctype.EAN13]: 'EAN 13',
  [Enctype.UPC_A]: 'UPC-A',
  [Enctype.UPC_E]: 'UPC-E',
}
