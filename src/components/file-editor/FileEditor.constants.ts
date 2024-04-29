const fonts = {
  'Andale Mono': 'andale mono,times',
  Arial: 'arial,helvetica,sans-serif',
  'Arial Black': 'arial black,avant garde',
  'Book Antiqua': 'book antiqua,palatino',
  'Comic Sans MS': 'comic sans ms,sans-serif',
  'Courier New': 'courier new,courier',
  Georgia: 'georgia,palatino',
  Helvetica: 'helvetica',
  Impact: 'impact,chicago',
  Symbol: 'symbol',
  Tahoma: 'tahoma,arial,helvetica,sans-serif',
  Terminal: 'terminal,monaco',
  'Times New Roman': 'times new roman,times',
  'Trebuchet MS': 'trebuchet ms,geneva',
  Verdana: 'verdana,geneva',
  Webdings: 'webdings',
  Wingdings: 'wingdings,zapf dingbats',
  Rubik: 'rubik'
}

const plugins = [
  'anchor',
  'accordion',
  'autolink',
  'autosave',
  'charmap',
  'codesample',
  'emoticons',
  'directionality',
  'help',
  'fullscreen',
  'preview',
  'pagebreak',
  'insertdatetime',
  'image',
  'link',
  'lists',
  'advlist',
  'media',
  'searchreplace',
  'table',
  'visualblocks',
  'wordcount',
  'code'
]

const toolbar = [
  'undo redo',
  'blocks fontsize',
  'bold italic underline strikethrough',
  'ltr rtl',
  'link image media table mergetags',
  'align lineheight',
  'tinycomments',
  'checklist numlist bullist indent outdent accordion',
  'removeformat'
]

export const fileEditorConfig = {
  fonts,
  plugins,
  toolbar
}
